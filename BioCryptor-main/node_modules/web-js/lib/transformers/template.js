var basicWrapper, esc, escaper, escapes, fs, noMatch, _;

_ = require("underscore");

fs = require('fs');

basicWrapper = require("../helpers").basicWrapper;

noMatch = /(.)^/;

escapes = {
  "'": "'",
  '\\': '\\',
  '\r': 'r',
  '\n': 'n',
  '\t': 't',
  '\u2028': 'u2028',
  '\u2029': 'u2029'
};

escaper = /\\|'|\r|\n|\t|\u2028|\u2029/g;

esc = "(function() {\nvar entityMap = {\n	'&': '&amp;',\n	'<': '&lt;',\n	'>': '&gt;',\n	'\"': '&quot;',\n	\"'\": '&#x27;'\n};\n\nvar entityRegex = new RegExp('[' + Object.keys(entityMap).join('') + ']', 'g');\n\nreturn function(str) { \n	return str == null ? '' : ('' + str).replace(entityRegex, function(m) { return entityMap[m]; });\n}\n})()";

module.exports = function(settings) {
  var render, t;
  _.defaults(settings, {
    variable: "$",
    extensions: [".html"]
  }, _.templateSettings);
  t = function(_module, filename) {
    var source, text;
    text = fs.readFileSync(filename, 'utf-8');
    source = basicWrapper(t.render(text), "html");
    _module._compile(source, filename);
  };
  render = t.render = function(text) {
    var aloEsc, footer, header, index, matcher, source;
    index = 0;
    source = "__p+='";
    aloEsc = false;
    matcher = new RegExp([(settings.escape || noMatch).source, (settings.interpolate || noMatch).source, (settings.evaluate || noMatch).source].join('|') + '|$', 'g');
    text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
      source += text.slice(index, offset).replace(escaper, function(match) {
        return '\\' + escapes[match];
      });
      if (escape) {
        aloEsc = true;
        source += "'+\n((__t=(" + escape + "))==null?'':__e(__t))+\n'";
      }
      if (interpolate) {
        source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
      }
      if (evaluate) {
        source += "';\n" + evaluate + "\n__p+='";
      }
      index = offset + match.length;
      return match;
    });
    source += "';\n";
    if (!settings.variable) {
      source = "with(obj||{}){\n" + source + "}\n";
    }
    header = "function(" + (settings.variable || "") + "){var __t,__p='',__j=Array.prototype.join,";
    if (aloEsc) {
      header += "__e=" + esc + ",";
    }
    header += "print=function(){__p+=__j.call(arguments,'');};\n";
    footer = "return __p;}";
    return header + source + footer;
  };
  return t;
};
