_ = require "underscore"
{Minimatch} = require "minimatch"
path = require "path"
fresh = require "fresh"
crypto = require "crypto"
conf = require "./config"

isMatch =
exports.isMatch = (filename, pattern) ->
	if _.isString(pattern) then pattern = new Minimatch pattern
	if pattern instanceof Minimatch then pattern.match filename
	else if _.isRegExp(pattern) then pattern.test filename
	else pattern is filename

exports.isQueryMatch = (filename, rules) ->
	rMatch = (rule, key) ->
		if _.isObject(rule)
			if key is "$or" then return _.any rule, rMatch
			else return _.every rule, rMatch
		return isMatch filename, rule

	return rMatch rules

stripIndex =
exports.stripIndex = (filepath) ->
	name = path.basename filepath
	if _.some(conf.get("http.index"), (p) -> isMatch name, p)
		filepath = path.dirname filepath
	return filepath

# generate sandbox context
exports.generate = (req, res, next) ->
	resolvePath = do ->
		dirname = path.dirname path.join "/", req.relative
		(p) -> path.resolve(dirname, stripIndex p).substr(1)

	$request: req
	$response: res
	$next: next
	write: _.bind res.write, res
	header: _.bind res.set, res
	statusCode: _.bind res.status, res
	contentType: _.bind res.type, res
	end: _.bind res.end, res

	# prints
	echo: (args...) ->
		vals = args.map (v) ->
			if _.isString(v) or _.isNumber(v) then return v
			else if Buffer.isBuffer(v) then return v.toString("utf-8")
			else return JSON.stringify(v)

		res.write vals.join(" ") + "\n", "utf-8"
		return

	# dynamic paths
	$resolvePath: resolvePath
	$url: do ->
		base = conf.get("http.url_base") ? ""
		if base.substr(-1) isnt "/" then base += "/"
		(p) -> base + resolvePath p

exports.basicWrapper = (src, type = "html") ->
	return """module.exports=#{src};
	if (require.main === module) {
		var content = typeof module.exports === "function" ? module.exports.call(this) : module.exports;
		contentType(#{JSON.stringify type});
		$response.set("Content-Length", content.length);
		write(content);
		end();
	}"""

md5 =
exports.md5 = (v) -> crypto.createHash("md5").update(v).digest("hex")

rand =
exports.rand = do ->
	depth = 4
	reducer = (m, h, i, l) -> m + parseInt(h, 16) * Math.pow(16, i)

	(min, max) ->
		bytes = crypto.randomBytes(depth).toString("hex").split("").reverse()
		num = _.reduce bytes, reducer, 0
		rando = num / Math.pow 256, depth

		unless min? then return rando
		unless max? then [max, min] = [min, 0]
		if max < min then [min, max] = [max, min]
		return Math.floor(rando * (max - min)) + min

randId =
exports.randId = (n = 6) -> rand Math.pow(10, n-1), Math.pow(10, n)

exports.cacheControl = do ->
	instanceId = randId()

	(req, res) ->
		res.set 'ETag', md5 req.method + req.url + req.stat.mtime + req.stat.size + instanceId
		res.set "Last-Modified", req.stat.mtime.toUTCString()
		
		if fresh req.headers, res._headers
			res.writeHead(304)
			res.end()
			return true

		return false