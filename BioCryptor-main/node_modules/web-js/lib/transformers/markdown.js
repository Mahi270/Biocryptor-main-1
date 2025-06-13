var basicWrapper, conf, fs, html, marked, path, tryYAML, _;

_ = require("underscore");

marked = require("marked");

fs = require("fs");

path = require("path");

basicWrapper = require("../helpers").basicWrapper;

conf = require("../config");

html = _.template("<!DOCTYPE html>\n<html lang=\"en-US\">\n	<head>\n		<meta charset=\"UTF-8\" />\n		<title><%= $.title != null && $.title !== \"\" ? $.title : require(\"path\").basename(__filename) %></title>\n		<!--[if lt IE 9]><script src=\"http://html5shim.googlecode.com/svn/trunk/html5.js\"></script><![endif]-->\n		\n		<% if ($.style == null) $.style = [];\n		if (!Array.isArray($.style)) $.style = [ $.style ];\n		$.style.forEach(function(s) { %>\n		<link rel=\"stylesheet\" href=\"<%= $url(s) %>\" type=\"text/css\" />\n		<% }); %>\n	</head>\n	<body>\n		<%= $.body %>\n	</body>\n</html>", null, {
  variable: "$"
});

tryYAML = function(text) {
  var e;
  try {
    return require("js-yaml").safeLoad(text);
  } catch (_error) {
    e = _error;
    return false;
  }
};

module.exports = function(options) {
  var parse, render, t;
  _.defaults(options, {
    extensions: [".md", ".markdown"],
    breaks: true,
    content_break: "-----",
    template_data: {},
    template: null
  });
  t = function(_module, filename) {
    var source, text;
    text = fs.readFileSync(filename, "utf-8");
    source = basicWrapper(t.render(t.parse(text)), "html");
    return _module._compile(source, filename);
  };
  parse = t.parse = function(text) {
    var body, data, markdown, meta, parts, _ref;
    parts = text.split("\n");
    parts = parts.reduce(function(m, p) {
      if (p === options.content_break) {
        m.push("");
      } else {
        m[m.length - 1] += p + "\n";
      }
      return m;
    }, [""]);
    meta = {};
    _.some(parts, function(p, i) {
      var data, raw;
      if (_.isEmpty(p)) {
        return;
      }
      raw = tryYAML(p);
      if (!(_.isObject(raw) && !_.isEmpty(raw))) {
        return;
      }
      data = _.chain(raw).pairs().map(function(d) {
        return [d[0].toLowerCase(), d[1]];
      }).object().value();
      meta = data;
      parts = parts.slice(i + 1);
      return true;
    });
    _.defaults(meta, (_ref = options.template_data) != null ? _ref : {});
    markdown = parts.join(options.content_break + "\n");
    body = marked(markdown, options);
    data = _.extend(meta, {
      body: body,
      markdown: markdown
    });
    return data;
  };
  render = t.render = function(data) {
    var tpl;
    tpl = options.template;
    if (!_.isEmpty(tpl)) {
      tpl = path.resolve(conf.get("cwd"), tpl);
    } else {
      tpl = options.template_data.template;
    }
    if (_.isEmpty(tpl)) {
      tpl = html.source;
    } else {
      tpl = "require(\"" + (!/^\.{0,2}\//.test(tpl) ? "./" : "") + tpl + "\")";
    }
    return "(function(){\n	var hard = " + (JSON.stringify(data)) + ",\n		hop = Object.hasOwnProperty;\n\n	function extend(obj) {\n		if (typeof obj === \"object\") {\n			var args = [].slice.call(arguments, 1);\n			args.forEach(function(o) {\n				if (typeof o !== \"object\") return;\n				Object.keys(o).forEach(function(key) {\n					obj[key] = o[key];\n				});\n			});\n		}\n		return obj;\n	}\n\n	return function(data) {\n		return (" + tpl + ").call(this, extend({}, hard, data));\n	}\n})();";
  };
  return t;
};
