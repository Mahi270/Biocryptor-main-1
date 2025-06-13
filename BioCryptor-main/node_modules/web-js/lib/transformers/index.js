var conf, config, path, transformers, _;

_ = require("underscore");

path = require("path");

conf = require("../config");

module.exports = transformers = {};

config = conf.get("sandbox.transformers");

_.each(config, function(options, name) {
  var e, filename, trans, _ref;
  if (!options) {
    return;
  }
  if (!_.isObject(options)) {
    options = {};
  }
  if (/^\.{0,2}\//.test(name)) {
    filename = path.resolve(conf.get("cwd"), name);
  } else {
    try {
      filename = require.resolve("./" + name);
    } catch (_error) {
      e = _error;
      filename = require.resolve(name);
    }
  }
  trans = {
    name: name,
    filename: filename,
    options: options
  };
  trans.fn = require(filename).call(trans, options);
  trans.extensions = (_ref = options.extensions) != null ? _ref : [];
  return transformers[name] = trans;
});
