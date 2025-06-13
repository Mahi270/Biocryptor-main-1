_ = require "underscore"
express = require "express"
http = require "http"
path = require "path"
conf = require "./config"

# HTTP Error Class
class global.HTTPError
	constructor: (@statusCode, @message) ->
		@message ?= http.STATUS_CODES[statusCode] ? "Server Error"
		stack = (new Error).stack.split("\n").slice(2)
		stack.unshift @toString()
		@stack = stack.join("\n")
	@:: = new Error
	toString: -> "#{@name}: [#{@statusCode}] #{@message}"
	name: "HTTPError"

# new express app
module.exports =
app = express()

# default middleware
app.use express.logger "dev"
if conf.get "http.compress" then app.use express.compress()
app.use require "./rewrite"

# user middleware
_.each conf.get("http.middleware"), (m) ->
	if _.isArray(m) then [name, args...] = m
	else [name, args] = [m, []]

	if express[name]? then mid = express[name]
	else if /^.{0,2}\//.test(name) then mid = require path.resolve conf.get("cwd"), name
	else mid = require name

	if _.isFunction(mid) then app.use mid.apply null, args

# sandbox and static files
if conf.get "sandbox.enabled" then app.use require "./sandbox"
if conf.get "static.enabled" then app.use require "./static"

# last route: 404
app.use (req, res, next) -> next new HTTPError 404

# custom error handle
app.use (err, req, res, next) ->
	env = conf.get("env")
	code = err.statusCode ? 500
	msg = if code is 500 and env is "development" then err.stack else err.message

	res.type "text"
	res.send code, code + " " + msg

# server starter helper
app.start = (onReady) ->
	http.createServer(app).listen conf.get("http.port"), onReady