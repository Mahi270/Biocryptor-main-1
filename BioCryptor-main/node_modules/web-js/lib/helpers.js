var Minimatch, conf, crypto, fresh, isMatch, md5, path, rand, randId, stripIndex, _,
  __slice = [].slice;

_ = require("underscore");

Minimatch = require("minimatch").Minimatch;

path = require("path");

fresh = require("fresh");

crypto = require("crypto");

conf = require("./config");

isMatch = exports.isMatch = function(filename, pattern) {
  if (_.isString(pattern)) {
    pattern = new Minimatch(pattern);
  }
  if (pattern instanceof Minimatch) {
    return pattern.match(filename);
  } else if (_.isRegExp(pattern)) {
    return pattern.test(filename);
  } else {
    return pattern === filename;
  }
};

exports.isQueryMatch = function(filename, rules) {
  var rMatch;
  rMatch = function(rule, key) {
    if (_.isObject(rule)) {
      if (key === "$or") {
        return _.any(rule, rMatch);
      } else {
        return _.every(rule, rMatch);
      }
    }
    return isMatch(filename, rule);
  };
  return rMatch(rules);
};

stripIndex = exports.stripIndex = function(filepath) {
  var name;
  name = path.basename(filepath);
  if (_.some(conf.get("http.index"), function(p) {
    return isMatch(name, p);
  })) {
    filepath = path.dirname(filepath);
  }
  return filepath;
};

exports.generate = function(req, res, next) {
  var resolvePath;
  resolvePath = (function() {
    var dirname;
    dirname = path.dirname(path.join("/", req.relative));
    return function(p) {
      return path.resolve(dirname, stripIndex(p)).substr(1);
    };
  })();
  return {
    $request: req,
    $response: res,
    $next: next,
    write: _.bind(res.write, res),
    header: _.bind(res.set, res),
    statusCode: _.bind(res.status, res),
    contentType: _.bind(res.type, res),
    end: _.bind(res.end, res),
    echo: function() {
      var args, vals;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      vals = args.map(function(v) {
        if (_.isString(v) || _.isNumber(v)) {
          return v;
        } else if (Buffer.isBuffer(v)) {
          return v.toString("utf-8");
        } else {
          return JSON.stringify(v);
        }
      });
      res.write(vals.join(" ") + "\n", "utf-8");
    },
    $resolvePath: resolvePath,
    $url: (function() {
      var base, _ref;
      base = (_ref = conf.get("http.url_base")) != null ? _ref : "";
      if (base.substr(-1) !== "/") {
        base += "/";
      }
      return function(p) {
        return base + resolvePath(p);
      };
    })()
  };
};

exports.basicWrapper = function(src, type) {
  if (type == null) {
    type = "html";
  }
  return "module.exports=" + src + ";\nif (require.main === module) {\n	var content = typeof module.exports === \"function\" ? module.exports.call(this) : module.exports;\n	contentType(" + (JSON.stringify(type)) + ");\n	$response.set(\"Content-Length\", content.length);\n	write(content);\n	end();\n}";
};

md5 = exports.md5 = function(v) {
  return crypto.createHash("md5").update(v).digest("hex");
};

rand = exports.rand = (function() {
  var depth, reducer;
  depth = 4;
  reducer = function(m, h, i, l) {
    return m + parseInt(h, 16) * Math.pow(16, i);
  };
  return function(min, max) {
    var bytes, num, rando, _ref, _ref1;
    bytes = crypto.randomBytes(depth).toString("hex").split("").reverse();
    num = _.reduce(bytes, reducer, 0);
    rando = num / Math.pow(256, depth);
    if (min == null) {
      return rando;
    }
    if (max == null) {
      _ref = [min, 0], max = _ref[0], min = _ref[1];
    }
    if (max < min) {
      _ref1 = [max, min], min = _ref1[0], max = _ref1[1];
    }
    return Math.floor(rando * (max - min)) + min;
  };
})();

randId = exports.randId = function(n) {
  if (n == null) {
    n = 6;
  }
  return rand(Math.pow(10, n - 1), Math.pow(10, n));
};

exports.cacheControl = (function() {
  var instanceId;
  instanceId = randId();
  return function(req, res) {
    res.set('ETag', md5(req.method + req.url + req.stat.mtime + req.stat.size + instanceId));
    res.set("Last-Modified", req.stat.mtime.toUTCString());
    if (fresh(req.headers, res._headers)) {
      res.writeHead(304);
      res.end();
      return true;
    }
    return false;
  };
})();
