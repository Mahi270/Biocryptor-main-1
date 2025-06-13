_ = require "underscore"
fs = require 'fs'
path = require 'path'
express = require "express"
{isQueryMatch, cacheControl} = require "./helpers"
conf = require "./config"

directory = express.directory conf.get("cwd")

module.exports = (req, res, next) ->
	return next() unless req.stat?

	# make sure we are allowed to be here
	allow = conf.get("static.allow") ? []
	return next() unless isQueryMatch req.relative, allow

	# cache control
	return if conf.get("static.cache") and cacheControl req, res

	# serve directories as html documents
	if req.stat.isDirectory() and conf.get("static.directory")
		return directory.apply this, arguments

	# get the content type
	ext = path.extname req.filename
	type = _.find conf.get("static.mime_types") ? [], (m, e) -> ext is m
	type = ext unless type?

	# set some headers
	_.each conf.get("static.headers"), (v, k) ->
		res.set k, v if _.isEmpty(res.get(k))
	res.type type
	res.set "Content-Length", req.stat.size

	# serve
	fs.createReadStream(req.filename).pipe res