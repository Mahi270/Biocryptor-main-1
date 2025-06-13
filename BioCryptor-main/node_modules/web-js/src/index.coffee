_ = require "underscore"
path = require "path"

# api for loading config and initiating express app
module.exports = (opts...) ->
	# load config
	conf = require "./config"

	# apply user settings
	opts.forEach (o) ->
		if _.isObject(o) then conf.load o
		else if _.isString(o)
			conf.loadFile path.resolve conf.get("cwd"), o

	# absoluteify the cwd
	conf.set "cwd", path.resolve conf.get "cwd"

	# validate the config
	conf.validate()

	# get the express app and export
	return require "./init"