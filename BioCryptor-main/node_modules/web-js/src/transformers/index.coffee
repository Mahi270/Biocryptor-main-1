_ = require "underscore"
path = require "path"
conf = require "../config"

module.exports =
transformers = {}
config = conf.get "sandbox.transformers"

_.each config, (options, name) ->
	return unless options # do nothing if options is false
	unless _.isObject(options) then options = {}

	if /^\.{0,2}\//.test(name)
		filename = path.resolve conf.get("cwd"), name
	else
		try filename = require.resolve "./#{name}"
		catch e then filename = require.resolve name

	trans = { name, filename, options }
	trans.fn = require(filename).call(trans, options)
	trans.extensions = options.extensions ? []

	transformers[name] = trans