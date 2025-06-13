_ = require "underscore"
fs = require "fs"
path = require "path"
less = require "less"
{basicWrapper} = require "../helpers"
conf = require "../config"

module.exports = (options) ->
	_.defaults options, extensions: [ ".less" ]
	cwd = conf.get("cwd")

	t = (_module, filename) ->
		text = fs.readFileSync filename, 'utf-8'
		source = t.render text, { filename: path.basename filename }

		_module._compile basicWrapper(JSON.stringify(source), "css"), filename
		return

	t.render = (text, opts = {}) ->
		_.extend opts, options,
			paths: [ cwd ],
			syncImport: true
		
		source = ""
		less.render text, opts, (e, css) ->
			if e? then throw e
			source = css

		return source

	return t