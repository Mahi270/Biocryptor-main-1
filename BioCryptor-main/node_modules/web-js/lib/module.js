var $pkg, TModule, assert, coreModules, good_things, hasOwnProperty, isCoreModule, path, vm, webjs, _;

_ = require("underscore");

TModule = require("module");

vm = require("vm");

path = require('path');

assert = require('assert');

$pkg = require("../package.json");

coreModules = ["assert", "buffer", "child_process", "cluster", "console", "constants", "crypto", "dgram", "dns", "domain", "events", "freelist", "fs", "http", "https", "module", "net", "os", "path", "punycode", "querystring", "readline", "repl", "smalloc", "stream", "string_decoder", "sys", "timers", "tls", "tracing", "tty", "url", "util", "vm", "zlib"];

isCoreModule = function(mod) {
  return coreModules.indexOf(mod) > -1;
};

hasOwnProperty = function(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
};

webjs = {};

good_things = {
  transformers: "./transformers",
  helpers: "./helpers"
};

_.each(good_things, function(n, k) {
  return webjs[k] = require(n);
});

module.exports = function(main, sandbox) {
  var Module, _global;
  _global = vm.createContext(sandbox);
  Module = (function() {
    var modulePaths, packageMainCache, readPackage, resolvedArgv, statPath, stripBOM, tryExtensions, tryFile, tryPackage;

    function Module(id, parent) {
      this.id = id;
      this.parent = parent;
      this.exports = {};
      this.filename = null;
      this.loaded = false;
      this.children = [];
      if (parent && parent.children) {
        parent.children.push(this);
      }
    }

    Module._contextLoad = +process.env['NODE_MODULE_CONTEXTS'] > 0;

    Module._cache = {};

    Module._pathCache = {};

    Module._extensions = {};

    modulePaths = [];

    Module.globalPaths = [];

    Module.mainModule = void 0;

    Module.wrap = function(script) {
      return Module.wrapper[0] + script + Module.wrapper[1];
    };

    Module.wrapper = ['(function (exports, require, module, __filename, __dirname) { ', '\n});'];

    statPath = function(path) {
      var ex, fs;
      fs = require('fs');
      try {
        return fs.statSync(path);
      } catch (_error) {
        ex = _error;
        return false;
      }
    };

    packageMainCache = {};

    readPackage = function(requestPath) {
      var e, fs, json, jsonPath, pkg;
      if (hasOwnProperty(packageMainCache, requestPath)) {
        return packageMainCache[requestPath];
      }
      fs = require('fs');
      try {
        jsonPath = path.resolve(requestPath, 'package.json');
        json = fs.readFileSync(jsonPath, 'utf8');
      } catch (_error) {
        e = _error;
        return false;
      }
      try {
        pkg = packageMainCache[requestPath] = JSON.parse(json).main;
      } catch (_error) {
        e = _error;
        e.path = jsonPath;
        e.message = 'Error parsing ' + jsonPath + ': ' + e.message;
        throw e;
      }
      return pkg;
    };

    tryPackage = function(requestPath, exts) {
      var filename, pkg;
      pkg = readPackage(requestPath);
      if (!pkg) {
        return false;
      }
      filename = path.resolve(requestPath, pkg);
      return tryFile(filename) || tryExtensions(filename, exts) || tryExtensions(path.resolve(filename, 'index'), exts);
    };

    Module._realpathCache = {};

    tryFile = function(requestPath) {
      var fs, stats;
      fs = require('fs');
      stats = statPath(requestPath);
      if (stats && !stats.isDirectory()) {
        return fs.realpathSync(requestPath, Module._realpathCache);
      }
      return false;
    };

    tryExtensions = function(p, exts) {
      var filename, i, _i, _ref;
      for (i = _i = 0, _ref = exts.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
        filename = tryFile(p + exts[i]);
        if (filename) {
          return filename;
        }
      }
      return false;
    };

    Module._findPath = function(request, paths) {
      var basePath, cacheKey, exts, filename, i, trailingSlash, _i, _ref;
      exts = Object.keys(this._extensions);
      if (request.charAt(0) === '/') {
        paths = [''];
      }
      trailingSlash = request.slice(-1) === '/';
      cacheKey = JSON.stringify({
        request: request,
        paths: paths
      });
      if (Module._pathCache[cacheKey]) {
        return Module._pathCache[cacheKey];
      }
      for (i = _i = 0, _ref = paths.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
        basePath = path.resolve(paths[i], request);
        if (!trailingSlash) {
          filename = tryFile(basePath);
          if (!filename && !trailingSlash) {
            filename = tryExtensions(basePath, exts);
          }
        }
        if (!filename) {
          filename = tryPackage(basePath, exts);
        }
        if (!filename) {
          filename = tryExtensions(path.resolve(basePath, 'index'), exts);
        }
        if (filename) {
          Module._pathCache[cacheKey] = filename;
          return filename;
        }
      }
      return false;
    };

    Module._nodeModulePaths = function(from) {
      var dir, parts, paths, splitRe, tip, _i, _ref;
      from = path.resolve(from);
      splitRe = process.platform === 'win32' ? /[\/\\]/ : /\//;
      paths = [];
      parts = from.split(splitRe);
      for (tip = _i = _ref = parts.length - 1; _ref <= 0 ? _i <= 0 : _i >= 0; tip = _ref <= 0 ? ++_i : --_i) {
        if (parts[tip] === 'node_modules') {
          continue;
        }
        dir = parts.slice(0, tip + 1).concat('node_modules').join(path.sep);
        paths.push(dir);
      }
      return paths;
    };

    Module._resolveLookupPaths = function(request, parent) {
      var id, isIndex, mainPaths, parentIdPath, paths, start;
      if (isCoreModule(request)) {
        return [request, []];
      }
      start = request.substring(0, 2);
      if (start !== './' && start !== '..') {
        paths = modulePaths;
        if (parent) {
          if (!parent.paths) {
            parent.paths = [];
          }
          paths = parent.paths.concat(paths);
        }
        return [request, paths];
      }
      if (!parent || !parent.id || !parent.filename) {
        mainPaths = ['.'].concat(modulePaths);
        mainPaths = Module._nodeModulePaths('.').concat(mainPaths);
        return [request, mainPaths];
      }
      isIndex = /^index\.\w+?$/.test(path.basename(parent.filename));
      parentIdPath = isIndex ? parent.id : path.dirname(parent.id);
      id = path.resolve(parentIdPath, request);
      if (parentIdPath === '.' && id.indexOf('/') === -1) {
        id = './' + id;
      }
      return [id, [path.dirname(parent.filename)]];
    };

    Module._load = function(request, parent, isMain) {
      var cachedModule, filename, hadException, module;
      filename = Module._resolveFilename(request, parent);
      cachedModule = Module._cache[filename];
      if (cachedModule) {
        return cachedModule.exports;
      }
      if (isCoreModule(filename)) {
        if (filename === 'module') {
          return Module;
        }
        return require(filename);
      }
      if (filename === $pkg.name) {
        return webjs;
      }
      module = new Module(filename, parent);
      if (isMain) {
        Module.mainModule = module;
        module.id = '.';
      }
      Module._cache[filename] = module;
      hadException = true;
      try {
        module.load(filename);
        hadException = false;
      } finally {
        if (hadException) {
          delete Module._cache[filename];
        }
      }
      return module.exports;
    };

    Module._resolveFilename = function(request, parent) {
      var err, filename, id, paths, resolvedModule;
      if (isCoreModule(request) || request === $pkg.name) {
        return request;
      }
      resolvedModule = Module._resolveLookupPaths(request, parent);
      id = resolvedModule[0];
      paths = resolvedModule[1];
      filename = Module._findPath(request, paths);
      if (!filename) {
        err = new Error("Cannot find module '" + request + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }
      return filename;
    };

    Module.prototype.load = function(filename) {
      var extension;
      assert(!this.loaded);
      this.filename = filename;
      this.paths = Module._nodeModulePaths(path.dirname(filename));
      extension = path.extname(filename) || '.js';
      if (!Module._extensions[extension]) {
        extension = '.js';
      }
      Module._extensions[extension](this, filename);
      this.loaded = true;
    };

    Module.prototype.require = function(path) {
      assert(_.isString(path), 'path must be a string');
      assert(path, 'missing path');
      return Module._load(path, this);
    };

    resolvedArgv = void 0;

    Module.prototype._compile = function(content, filename) {
      var args, compiledWrapper, dirname, require, self, wrapper;
      self = this;
      content = content.replace(/^\#\!.*/, '');
      require = function(path) {
        return self.require(path);
      };
      require.resolve = function(request) {
        return Module._resolveFilename(request, self);
      };
      Object.defineProperty(require, 'paths', {
        get: function() {
          throw new Error('require.paths is removed. Use ' + 'node_modules folders, or the NODE_PATH ' + 'environment variable instead.');
        }
      });
      require.main = Module.mainModule;
      require.extensions = Module._extensions;
      require.registerExtension = function() {
        throw new Error('require.registerExtension() removed. Use ' + 'require.extensions instead.');
      };
      require.cache = Module._cache;
      dirname = path.dirname(filename);
      wrapper = Module.wrap(content);
      compiledWrapper = vm.runInContext(wrapper, _global, filename);
      args = [self.exports, require, self, filename, dirname];
      return compiledWrapper.apply(self.exports, args);
    };

    stripBOM = function(content) {
      if (content.charCodeAt(0) === 0xFEFF) {
        content = content.slice(1);
      }
      return content;
    };

    Module._extensions['.js'] = function(module, filename) {
      var content;
      content = require('fs').readFileSync(filename, 'utf8');
      module._compile(stripBOM(content), filename);
    };

    Module._extensions['.json'] = function(module, filename) {
      var content, err;
      content = require('fs').readFileSync(filename, 'utf8');
      try {
        module.exports = JSON.parse(stripBOM(content));
      } catch (_error) {
        err = _error;
        err.message = filename + ': ' + err.message;
        throw err;
      }
    };

    Module._extensions['.node'] = TModule._extensions['.node'];

    _.each(require("./transformers"), function(t) {
      return _.each(t.extensions, function(ext) {
        return Module._extensions[ext] = t.fn;
      });
    });

    Module.runMain = function() {
      Module._load(main, null, true);
      process._tickCallback();
    };

    Module._initPaths = function() {
      var homeDir, isWindows, paths;
      isWindows = process.platform === 'win32';
      if (isWindows) {
        homeDir = process.env.USERPROFILE;
      } else {
        homeDir = process.env.HOME;
      }
      paths = [path.resolve(process.execPath, '..', '..', 'lib', 'node')];
      if (homeDir) {
        paths.unshift(path.resolve(homeDir, '.node_libraries'));
        paths.unshift(path.resolve(homeDir, '.node_modules'));
      }
      if (process.env['NODE_PATH']) {
        paths = process.env['NODE_PATH'].split(path.delimiter).concat(paths);
      }
      modulePaths = paths;
      Module.globalPaths = modulePaths.slice(0);
    };

    Module.requireRepl = function() {
      return Module._load('repl', '.');
    };

    Module._initPaths();

    Module.Module = Module;

    return Module;

  })();
  return Module;
};
