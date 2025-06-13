# Refactored copy of https://github.com/joyent/node/blob/069dd07a1732c6a752773aaed9e8c18ab472375f/lib/module.js
# modified for use in coffeescript and this library

# dependencies
_ = require "underscore"
TModule = require "module"
vm = require "vm"
path = require 'path'
assert = require 'assert'

# keep things dry
$pkg = require "../package.json"

# we don't have NativeModule like Module does, so we improvise
coreModules = [ "assert", "buffer", "child_process", "cluster", "console", "constants", "crypto", "dgram", "dns", "domain", "events", "freelist", "fs", "http", "https", "module", "net", "os", "path", "punycode", "querystring", "readline", "repl", "smalloc", "stream", "string_decoder", "sys", "timers", "tls", "tracing", "tty", "url", "util", "vm", "zlib" ]
isCoreModule = (mod) -> coreModules.indexOf(mod) > -1

# If obj.hasOwnProperty has been overridden, then calling
# obj.hasOwnProperty(prop) will break.
# See: https:#github.com/joyent/node/issues/1707
hasOwnProperty = (obj, prop) ->
	return Object.prototype.hasOwnProperty.call obj, prop

# instead of web-js we return this object
webjs = {}
good_things = transformers: "./transformers", helpers: "./helpers"
_.each good_things, (n, k) -> webjs[k] = require n

# wrapped to ensure a fresh copy
# every time it's required
module.exports = (main, sandbox) ->
	_global = vm.createContext sandbox

	class Module

		constructor: (@id, @parent) ->
			@exports = {}
			@filename = null
			@loaded = false
			@children = []
			
			if parent and parent.children
				parent.children.push @

		# Set the environ variable NODE_MODULE_CONTEXTS=1 to make node load all
		# modules in their own context.
		@_contextLoad = +process.env['NODE_MODULE_CONTEXTS'] > 0
		@_cache = {}
		@_pathCache = {}
		@_extensions = {}
		modulePaths = []
		@globalPaths = []
		@mainModule = undefined

		@wrap = (script) -> Module.wrapper[0] + script + Module.wrapper[1]
		@wrapper = [
			'(function (exports, require, module, __filename, __dirname) { ',
			'\n});'
		]

		# given a module name, and a list of paths to test, returns the first
		# matching file in the following precedence.
		#
		# require("a.<ext>")
		#   -> a.<ext>
		#
		# require("a")
		#   -> a
		#   -> a.<ext>
		#   -> a/index.<ext>

		statPath = (path) ->
			fs = require 'fs'
			return try fs.statSync path
			catch ex then false

		# check if the directory is a package.json dir
		packageMainCache = {}

		readPackage = (requestPath) ->
			if hasOwnProperty packageMainCache, requestPath
				return packageMainCache[requestPath]

			fs = require 'fs'
			try
				jsonPath = path.resolve requestPath, 'package.json'
				json = fs.readFileSync jsonPath, 'utf8'
			catch e then return false

			try pkg = packageMainCache[requestPath] = JSON.parse(json).main
			catch e
				e.path = jsonPath
				e.message = 'Error parsing ' + jsonPath + ': ' + e.message
				throw e
			
			return pkg

		tryPackage = (requestPath, exts) ->
			pkg = readPackage requestPath
			unless pkg then return false

			filename = path.resolve requestPath, pkg
			return tryFile(filename) or tryExtensions(filename, exts) or tryExtensions(path.resolve(filename, 'index'), exts);

		# In order to minimize unnecessary lstat() calls,
		# this cache is a list of known-real paths.
		# Set to an empty object to reset.
		@_realpathCache = {};

		# check if the file exists and is not a directory
		tryFile = (requestPath) ->
			fs = require 'fs'
			stats = statPath requestPath
			if stats and !stats.isDirectory()
				return fs.realpathSync requestPath, Module._realpathCache
			return false

		# given a path check a the file exists with any of the set extensions
		tryExtensions = (p, exts) ->
			for i in [0...exts.length]
				filename = tryFile p + exts[i]
				if filename then return filename
			return false

		@_findPath = (request, paths) ->
			exts = Object.keys @_extensions

			if request.charAt(0) is '/' then paths = ['']

			trailingSlash = request.slice(-1) is '/'

			cacheKey = JSON.stringify { request, paths }
			if Module._pathCache[cacheKey]
				return Module._pathCache[cacheKey]

			# For each path
			for i in [0...paths.length]
				basePath = path.resolve paths[i], request

				unless trailingSlash
					# try to join the request to the path
					filename = tryFile basePath

					if !filename and !trailingSlash
						# try it with each of the extensions
						filename = tryExtensions basePath, exts

				unless filename
					filename = tryPackage basePath, exts

				unless filename
					# try it with each of the extensions at "index"
					filename = tryExtensions path.resolve(basePath, 'index'), exts

				if filename
					Module._pathCache[cacheKey] = filename
					return filename

			return false

		# 'from' is the __dirname of the module.
		@_nodeModulePaths = (from) ->
			# guarantee that 'from' is absolute.
			from = path.resolve from

			# note: this approach *only* works when the path is guaranteed
			# to be absolute.  Doing a fully-edge-case-correct path.split
			# that works on both Windows and Posix is non-trivial.
			splitRe = if process.platform is 'win32' then /[\/\\]/ else /\//
			paths = []
			parts = from.split splitRe

			for tip in [parts.length - 1..0]
				# don't search in .../node_modules/node_modules
				if parts[tip] is 'node_modules' then continue
				dir = parts.slice(0, tip + 1).concat('node_modules').join(path.sep)
				paths.push(dir)

			return paths

		@_resolveLookupPaths = (request, parent) ->
			if isCoreModule request
				return [request, []]

			start = request.substring 0, 2
			if start isnt './' and start isnt '..'
				paths = modulePaths
				if parent
					unless parent.paths then parent.paths = []
					paths = parent.paths.concat paths
				return [request, paths]

			# with --eval, parent.id is not set and parent.filename is null
			if !parent or !parent.id or !parent.filename
				# make require('./path/to/foo') work - normally the path is taken
				# from realpath(__filename) but with eval there is no filename
				mainPaths = ['.'].concat(modulePaths)
				mainPaths = Module._nodeModulePaths('.').concat(mainPaths)
				return [request, mainPaths]

			# Is the parent an index module?
			# We can assume the parent has a valid extension,
			# as it already has been accepted as a module.
			isIndex = /^index\.\w+?$/.test(path.basename(parent.filename))
			parentIdPath = if isIndex then parent.id else path.dirname(parent.id)
			id = path.resolve(parentIdPath, request)

			# make sure require('./path') and require('path') get distinct ids, even
			# when called from the toplevel js file
			if parentIdPath is '.' and id.indexOf('/') is -1 then id = './' + id

			return [id, [path.dirname(parent.filename)]]

		@_load = (request, parent, isMain) ->
			filename = Module._resolveFilename request, parent

			cachedModule = Module._cache[filename]
			if cachedModule then return cachedModule.exports

			if isCoreModule(filename)
				# module is a special, because we want this one, not the real one
				if filename is 'module' then return Module

				return require filename

			# requiring web-js is bad so instead we return good things
			if filename is $pkg.name then return webjs

			module = new Module filename, parent

			if isMain
				Module.mainModule = module
				module.id = '.'

			Module._cache[filename] = module

			hadException = true;

			try
				module.load filename
				hadException = false
			finally
				if hadException
					delete Module._cache[filename]

			return module.exports

		@_resolveFilename = (request, parent) ->
			if isCoreModule(request) or request is $pkg.name
				return request

			resolvedModule = Module._resolveLookupPaths request, parent
			id = resolvedModule[0]
			paths = resolvedModule[1]

			# look up the filename first, since that's the cache key.
			filename = Module._findPath request, paths
			unless filename
				err = new Error "Cannot find module '" + request + "'"
				err.code = 'MODULE_NOT_FOUND'
				throw err

			return filename

		load: (filename) ->
			assert not @loaded
			@filename = filename
			@paths = Module._nodeModulePaths path.dirname filename

			extension = path.extname(filename) or '.js'
			unless Module._extensions[extension] then extension = '.js'
			Module._extensions[extension] @, filename
			this.loaded = true

			return

		require: (path) ->
			assert _.isString(path), 'path must be a string'
			assert path, 'missing path'
			return Module._load path, @

		# Resolved path to process.argv[1] will be lazily placed here
		# (needed for setting breakpoint when called with --debug-brk)
		resolvedArgv = undefined

		# Returns exception if any
		_compile: (content, filename) ->
			self = @
			
			# remove shebang
			content = content.replace(/^\#\!.*/, '');

			require = (path) -> self.require path
			require.resolve = (request) -> Module._resolveFilename request, self

			Object.defineProperty require, 'paths',
				get: ->
					throw new Error('require.paths is removed. Use ' +
						'node_modules folders, or the NODE_PATH ' +
						'environment variable instead.')

			require.main = Module.mainModule

			# Enable support to add extra extension types
			require.extensions = Module._extensions
			require.registerExtension = () ->
				throw new Error('require.registerExtension() removed. Use ' +
					'require.extensions instead.')

			require.cache = Module._cache

			dirname = path.dirname(filename)

			# if Module._contextLoad
			# This is where we would stick code to have the module
			# load in its own context. I haven't implemented this
			# yet due to the inherent fear factor.

			# create wrapper function
			# Notice how we execute in the global context and not this
			# one. This context will always run in the true global.
			wrapper = Module.wrap content
			compiledWrapper = vm.runInContext wrapper, _global, filename

			# if global.v8debug
			# Some misc debug goes here. Should probably figure out
			# what it does at some point.

			args = [self.exports, require, self, filename, dirname]
			return compiledWrapper.apply self.exports, args

		stripBOM = (content) ->
			# Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
			# because the buffer-to-string conversion in `fs.readFileSync()`
			# translates it to FEFF, the UTF-16 BOM.
			if content.charCodeAt(0) is 0xFEFF
				content = content.slice(1)
			
			return content

		# Native extension for .js
		@_extensions['.js'] = (module, filename) ->
			content = require('fs').readFileSync(filename, 'utf8')
			module._compile stripBOM(content), filename
			return

		# Native extension for .json
		@_extensions['.json'] = (module, filename) ->
			content = require('fs').readFileSync(filename, 'utf8')
			try module.exports = JSON.parse stripBOM(content)
			catch err
				err.message = filename + ': ' + err.message
				throw err
			return

		# Native extension for .node
		@_extensions['.node'] = TModule._extensions['.node']

		# load up transformers
		_.each require("./transformers"), (t) ->
			_.each t.extensions, (ext) ->
				Module._extensions[ext] = t.fn

		# bootstrap main module.
		@runMain = ->
			# Load the main module--the first argument.
			Module._load main, null, true
			# Handle any nextTicks added in the first tick of the program
			process._tickCallback()

			return

		@_initPaths = ->
			isWindows = process.platform is 'win32'

			if isWindows then homeDir = process.env.USERPROFILE
			else homeDir = process.env.HOME

			paths = [path.resolve(process.execPath, '..', '..', 'lib', 'node')]

			if homeDir
				paths.unshift path.resolve(homeDir, '.node_libraries')
				paths.unshift path.resolve(homeDir, '.node_modules')

			if  process.env['NODE_PATH']
				paths = process.env['NODE_PATH'].split(path.delimiter).concat(paths)

			modulePaths = paths

			# clone as a read-only copy, for introspection.
			Module.globalPaths = modulePaths.slice(0)

			return

		# bootstrap repl
		@requireRepl = -> Module._load 'repl', '.'

		@_initPaths()

		# backwards compatibility
		@Module = @

	return Module