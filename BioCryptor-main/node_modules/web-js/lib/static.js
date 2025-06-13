var cacheControl, conf, directory, express, fs, isQueryMatch, path, _, _ref;

_ = require("underscore");

fs = require('fs');

path = require('path');

express = require("express");

_ref = require("./helpers"), isQueryMatch = _ref.isQueryMatch, cacheControl = _ref.cacheControl;

conf = require("./config");

directory = express.directory(conf.get("cwd"));

module.exports = function(req, res, next) {
  var allow, ext, type, _ref1, _ref2;
  if (req.stat == null) {
    return next();
  }
  allow = (_ref1 = conf.get("static.allow")) != null ? _ref1 : [];
  if (!isQueryMatch(req.relative, allow)) {
    return next();
  }
  if (conf.get("static.cache") && cacheControl(req, res)) {
    return;
  }
  if (req.stat.isDirectory() && conf.get("static.directory")) {
    return directory.apply(this, arguments);
  }
  ext = path.extname(req.filename);
  type = _.find((_ref2 = conf.get("static.mime_types")) != null ? _ref2 : [], function(m, e) {
    return ext === m;
  });
  if (type == null) {
    type = ext;
  }
  _.each(conf.get("static.headers"), function(v, k) {
    if (_.isEmpty(res.get(k))) {
      return res.set(k, v);
    }
  });
  res.type(type);
  res.set("Content-Length", req.stat.size);
  return fs.createReadStream(req.filename).pipe(res);
};
