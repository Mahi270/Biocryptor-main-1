var path, _,
  __slice = [].slice;

_ = require("underscore");

path = require("path");

module.exports = function() {
  var conf, opts;
  opts = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
  conf = require("./config");
  opts.forEach(function(o) {
    if (_.isObject(o)) {
      return conf.load(o);
    } else if (_.isString(o)) {
      return conf.loadFile(path.resolve(conf.get("cwd"), o));
    }
  });
  conf.set("cwd", path.resolve(conf.get("cwd")));
  conf.validate();
  return require("./init");
};
