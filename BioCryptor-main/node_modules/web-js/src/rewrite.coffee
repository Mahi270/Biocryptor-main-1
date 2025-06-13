_ = require "underscore"
fs = require "fs"
path = require "path"
{isMatch, isQueryMatch} = require "./helpers"
conf = require "./config"

module.exports = (req, res, next) ->
	# represent!
	res.set "X-Powered-By", "WebJS (Express)"

	# ignore certain paths
	parts = req.path.split "/"
	ignored = _.some parts, (part, i) ->
		part = part + "/" if i+1 isnt parts.length
		_.some conf.get("http.ignore"), (p) -> isMatch part, p
	if ignored then return next()

	# return 403 on denied routes
	# relPath = path.relative "/", req.path
	return next new HTTPError 403 unless isQueryMatch req.path, conf.get("http.allow")

	# get the true filename by cwd
	req.filename = path.join conf.get("cwd"), req.path
	req.relative = path.relative conf.get("cwd"), req.filename

	# rewrite request paths
	_.some conf.get("http.rewrite"), (r) ->
		return unless _.isArray(r)
		
		if r.length is 3 then reg = new RegExp r[0], r[2]
		else if r.length is 2 then reg = new RegExp r[0]
		return unless reg? and reg.test req.relative

		req.relative = req.relative.replace reg, r[1]
		req.filename = path.resolve conf.get("cwd"), req.relative
		return true

	# check if it actually exists
	return next() unless fs.existsSync req.filename
	req.stat = fs.statSync(req.filename)

	# adjust filename for directories
	if req.stat.isDirectory()
		dirfiles = fs.readdirSync req.filename
		index = _.find dirfiles, (f) -> _.some conf.get("http.index"), (p) -> isMatch f, p

		if index?
			req.filename = path.join req.filename, index
			req.relative = path.relative conf.get("cwd"), req.filename
			req.stat = fs.statSync(req.filename)
	
	# continue
	next()