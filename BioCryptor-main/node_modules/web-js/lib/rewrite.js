var conf, fs, isMatch, isQueryMatch, path, _, _ref;

_ = require("underscore");

fs = require("fs");

path = require("path");

_ref = require("./helpers"), isMatch = _ref.isMatch, isQueryMatch = _ref.isQueryMatch;

conf = require("./config");

module.exports = function(req, res, next) {
  var dirfiles, ignored, index, parts;
  res.set("X-Powered-By", "WebJS (Express)");
  parts = req.path.split("/");
  ignored = _.some(parts, function(part, i) {
    if (i + 1 !== parts.length) {
      part = part + "/";
    }
    return _.some(conf.get("http.ignore"), function(p) {
      return isMatch(part, p);
    });
  });
  if (ignored) {
    return next();
  }
  if (!isQueryMatch(req.path, conf.get("http.allow"))) {
    return next(new HTTPError(403));
  }
  req.filename = path.join(conf.get("cwd"), req.path);
  req.relative = path.relative(conf.get("cwd"), req.filename);
  _.some(conf.get("http.rewrite"), function(r) {
    var reg;
    if (!_.isArray(r)) {
      return;
    }
    if (r.length === 3) {
      reg = new RegExp(r[0], r[2]);
    } else if (r.length === 2) {
      reg = new RegExp(r[0]);
    }
    if (!((reg != null) && reg.test(req.relative))) {
      return;
    }
    req.relative = req.relative.replace(reg, r[1]);
    req.filename = path.resolve(conf.get("cwd"), req.relative);
    return true;
  });
  if (!fs.existsSync(req.filename)) {
    return next();
  }
  req.stat = fs.statSync(req.filename);
  if (req.stat.isDirectory()) {
    dirfiles = fs.readdirSync(req.filename);
    index = _.find(dirfiles, function(f) {
      return _.some(conf.get("http.index"), function(p) {
        return isMatch(f, p);
      });
    });
    if (index != null) {
      req.filename = path.join(req.filename, index);
      req.relative = path.relative(conf.get("cwd"), req.filename);
      req.stat = fs.statSync(req.filename);
    }
  }
  return next();
};
