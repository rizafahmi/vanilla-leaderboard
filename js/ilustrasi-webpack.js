const modules = {
  'basic_calc.js': function(exports, require) {
    exports.add = function(a, b) {
      return a + b;
    };
    exports.sub = function(a, b) {
      return a - b;
    };
    exports.mul = function(a, b) {
      return a * b;
    };
    exports.div = function(a, b) {
      return a / b;
    };
  },
  'advance_calc.js': function(exports, require) {
    const mul = require('basic_calc.js').mul;
    exports.squared = function(a) {
      return mul(a, a);
    };
  },
  'main.js': function(exports, require) {
    const add = require('basic_calc.js').add;
    const mul = require('basic_calc.js').mul;
    const squared = require('advance_calc.js').squared;

    console.log(add(1, 3));
    console.log(mul(2, 4));
    console.log(squared(4));
  }
};

webpackStart({
  modules,
  entry: 'app.js'
});
