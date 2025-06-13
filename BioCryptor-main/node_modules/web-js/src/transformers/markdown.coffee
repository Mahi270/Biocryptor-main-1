_ = require "underscore"
marked = require "marked"
fs = require "fs"
path = require "path"
{basicWrapper} = require "../helpers"
conf = require "../config"

html = _.template """<!DOCTYPE html>
<html lang="en-US">
	<head>
		<meta charset="UTF-8" />
		<title><%= $.title != null && $.title !== "" ? $.title : require("path").basename(__filename) %></title>
		<!--[if lt IE 9]><script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script><![endif]-->
		
		<% if ($.style == null) $.style = [];
		if (!Array.isArray($.style)) $.style = [ $.style ];
		$.style.forEach(function(s) { %>
		<link rel="stylesheet" href="<%= $url(s) %>" type="text/css" />
		<% }); %>
	</head>
	<body>
		<%= $.body %>
	</body>
</html>""", null, variable: "$"

tryYAML = (text) ->
	try return require("js-yaml").safeLoad text
	catch e then return false

module.exports = (options) ->
	_.defaults options,
		extensions: [ ".md", ".markdown" ]
		breaks: true
		content_break: "-----"
		template_data: {}
		template: null

	t = (_module, filename) ->
		text = fs.readFileSync(filename, "utf-8")
		source = basicWrapper t.render(t.parse text), "html"

		_module._compile source, filename

	parse =
	t.parse = (text) ->
		# break into parts
		parts = text.split "\n"
		parts = parts.reduce (m, p) ->
			if p is options.content_break then m.push ""
			else m[m.length - 1] += p + "\n"
			return m
		, [""]

		# parse for meta data
		meta = {}

		_.some parts, (p, i) ->
			return if _.isEmpty(p)
			
			raw = tryYAML(p)
			return unless _.isObject(raw) and !_.isEmpty(raw)

			data = _.chain(raw).pairs()
				.map (d) -> [d[0].toLowerCase(), d[1]]
				.object().value()
			
			meta = data
			parts = parts.slice i + 1
			return true
		
		_.defaults meta, options.template_data ? {}

		# parse the body
		markdown = parts.join(options.content_break + "\n")
		body = marked markdown, options
		data = _.extend meta, { body, markdown }

		return data
		
	render =
	t.render = (data) ->
		tpl = options.template
		unless _.isEmpty(tpl) then tpl = path.resolve conf.get("cwd"), tpl
		else tpl = options.template_data.template
		if _.isEmpty(tpl) then tpl = html.source
		else tpl = """require("#{unless /^\.{0,2}\//.test(tpl) then "./" else ""}#{tpl}")"""

		return """(function(){
			var hard = #{JSON.stringify(data)},
				hop = Object.hasOwnProperty;

			function extend(obj) {
				if (typeof obj === "object") {
					var args = [].slice.call(arguments, 1);
					args.forEach(function(o) {
						if (typeof o !== "object") return;
						Object.keys(o).forEach(function(key) {
							obj[key] = o[key];
						});
					});
				}
				return obj;
			}

			return function(data) {
				return (#{tpl}).call(this, extend({}, hard, data));
			}
		})();"""

	return t