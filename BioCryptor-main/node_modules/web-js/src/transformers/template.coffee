_ = require "underscore"
fs = require 'fs'
{basicWrapper} = require "../helpers"

noMatch = /(.)^/
escapes =
	"'":      "'",
	'\\':     '\\',
	'\r':     'r',
	'\n':     'n',
	'\t':     't',
	'\u2028': 'u2028',
	'\u2029': 'u2029'
escaper = /\\|'|\r|\n|\t|\u2028|\u2029/g

esc = """(function() {
	var entityMap = {
		'&': '&amp;',
		'<': '&lt;',
		'>': '&gt;',
		'"': '&quot;',
		"'": '&#x27;'
	};

	var entityRegex = new RegExp('[' + Object.keys(entityMap).join('') + ']', 'g');

	return function(str) { 
		return str == null ? '' : ('' + str).replace(entityRegex, function(m) { return entityMap[m]; });
	}
})()
"""

module.exports = (settings) ->
	_.defaults(settings, {
		variable: "$"
		extensions: [ ".html" ]
	}, _.templateSettings)

	t = (_module, filename) ->
		text = fs.readFileSync filename, 'utf-8'
		source = basicWrapper t.render(text), "html"

		_module._compile source, filename
		return

	render =
	t.render = (text) ->
		index = 0
		source = "__p+='"
		aloEsc = false

		matcher = new RegExp([
			(settings.escape || noMatch).source,
			(settings.interpolate || noMatch).source,
			(settings.evaluate || noMatch).source
		].join('|') + '|$', 'g')
		
		text.replace matcher, (match, escape, interpolate, evaluate, offset) ->
			source += text.slice(index, offset)
				.replace escaper, (match) -> '\\' + escapes[match]

			if escape
				aloEsc = true
				source += "'+\n((__t=(#{escape}))==null?'':__e(__t))+\n'"
			if interpolate then source += "'+\n((__t=(#{interpolate}))==null?'':__t)+\n'"
			if evaluate then source += "';\n#{evaluate}\n__p+='"

			index = offset + match.length
			return match

		source += "';\n";

		unless settings.variable then source = "with(obj||{}){\n#{source}}\n"

		header = "function(#{settings.variable or ""}){var __t,__p='',__j=Array.prototype.join,"
		if aloEsc then header += "__e=#{esc},"
		header += "print=function(){__p+=__j.call(arguments,'');};\n"

		footer = "return __p;}"

		return header + source + footer

	return t