var basicWrapper, conf, fs, less, path, _;

_ = require("underscore");

fs = require("fs");

path = require("path");

less = require("less");

basicWrapper = require("../helpers").basicWrapper;

conf = require("../config");

module.exports = function(options) {
  var cwd, t;
  _.defaults(options, {
    extensions: [".less"]
  });
  cwd = conf.get("cwd");
  t = function(_module, filename) {
    var source, text;
    text = fs.readFileSync(filename, 'utf-8');
    source = t.render(text, {
      filename: path.basename(filename)
    });
    _module._compile(basicWrapper(JSON.stringify(source), "css"), filename);
  };
  t.render = function(text, opts) {
    var source;
    if (opts == null) {
      opts = {};
    }
    _.extend(opts, options, {
      paths: [cwd],
      syncImport: true
    });
    source = "";
    less.render(text, opts, function(e, css) {
      if (e != null) {
        throw e;
      }
      return source = css;
    });
    return source;
  };
  return t;
};
