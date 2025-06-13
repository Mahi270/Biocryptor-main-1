var app, conf, express, http, path, _,
  __slice = [].slice;

_ = require("underscore");

express = require("express");

http = require("http");

path = require("path");

conf = require("./config");

global.HTTPError = (function() {
  function HTTPError(statusCode, message) {
    var stack, _ref;
    this.statusCode = statusCode;
    this.message = message;
    if (this.message == null) {
      this.message = (_ref = http.STATUS_CODES[statusCode]) != null ? _ref : "Server Error";
    }
    stack = (new Error).stack.split("\n").slice(2);
    stack.unshift(this.toString());
    this.stack = stack.join("\n");
  }

  HTTPError.prototype = new Error;

  HTTPError.prototype.toString = function() {
    return "" + this.name + ": [" + this.statusCode + "] " + this.message;
  };

  HTTPError.prototype.name = "HTTPError";

  return HTTPError;

})();

module.exports = app = express();

app.use(express.logger("dev"));

if (conf.get("http.compress")) {
  app.use(express.compress());
}

app.use(require("./rewrite"));

_.each(conf.get("http.middleware"), function(m) {
  var args, mid, name, _ref;
  if (_.isArray(m)) {
    name = m[0], args = 2 <= m.length ? __slice.call(m, 1) : [];
  } else {
    _ref = [m, []], name = _ref[0], args = _ref[1];
  }
  if (express[name] != null) {
    mid = express[name];
  } else if (/^.{0,2}\//.test(name)) {
    mid = require(path.resolve(conf.get("cwd"), name));
  } else {
    mid = require(name);
  }
  if (_.isFunction(mid)) {
    return app.use(mid.apply(null, args));
  }
});

if (conf.get("sandbox.enabled")) {
  app.use(require("./sandbox"));
}

if (conf.get("static.enabled")) {
  app.use(require("./static"));
}

app.use(function(req, res, next) {
  return next(new HTTPError(404));
});

app.use(function(err, req, res, next) {
  var code, env, msg, _ref;
  env = conf.get("env");
  code = (_ref = err.statusCode) != null ? _ref : 500;
  msg = code === 500 && env === "development" ? err.stack : err.message;
  res.type("text");
  return res.send(code, code + " " + msg);
});

app.start = function(onReady) {
  return http.createServer(app).listen(conf.get("http.port"), onReady);
};
