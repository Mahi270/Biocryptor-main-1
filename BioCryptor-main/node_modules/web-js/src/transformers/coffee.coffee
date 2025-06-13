_ = require "underscore"
fs = require "fs"
coffee = require "coffee-script"

module.exports = (options) ->
	_.defaults options, extensions: [ ".coffee" ]

	return (_module, filename) ->
		text = fs.readFileSync filename, 'utf-8'
		source = coffee.compile text, options
		_module._compile source, filename
		return