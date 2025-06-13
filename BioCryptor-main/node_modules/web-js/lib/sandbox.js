var allow, cacheControl, conf, createContext, createNewModuleContext, generate, isQueryMatch, path, _, _ref, _ref1;

_ = require("underscore");

path = require("path");

_ref = require("./helpers"), isQueryMatch = _ref.isQueryMatch, generate = _ref.generate, cacheControl = _ref.cacheControl;

createNewModuleContext = require("./module");

conf = require("./config");

createContext = function(filename, sandbox) {
  var modctx;
  _.extend(sandbox, {
    __createContext: createContext,
    $config: conf.get(),
    console: console,
    process: process,
    Buffer: Buffer,
    root: root,
    setTimeout: setTimeout,
    clearTimeout: clearTimeout,
    setInterval: setInterval,
    clearInterval: clearInterval
  });
  sandbox.global = sandbox;
  modctx = createNewModuleContext(filename, sandbox);
  modctx.runMain();
  return modctx;
};

allow = (_ref1 = conf.get("sandbox.allow")) != null ? _ref1 : [];

allow.push({
  $or: _.chain(require("./transformers")).values().pluck("extensions").flatten().unique().map(function(e) {
    return "**/*" + e;
  }).value().concat("**/*.js")
});

module.exports = function(req, res, next) {
  var sandbox;
  if (req.stat == null) {
    return next();
  }
  if (!isQueryMatch(req.relative, allow)) {
    return next();
  }
  if (conf.get("sandbox.cache") && cacheControl(req, res)) {
    return;
  }
  sandbox = generate(req, res, next);
  return createContext(req.filename, sandbox);
};
