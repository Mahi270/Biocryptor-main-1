var coffee, fs, _;

_ = require("underscore");

fs = require("fs");

coffee = require("coffee-script");

module.exports = function(options) {
  _.defaults(options, {
    extensions: [".coffee"]
  });
  return function(_module, filename) {
    var source, text;
    text = fs.readFileSync(filename, 'utf-8');
    source = coffee.compile(text, options);
    _module._compile(source, filename);
  };
};
