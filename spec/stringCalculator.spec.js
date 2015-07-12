'use strict';

var add = require('../src/stringCalculator');
var chai = require('chai');

chai.should();

describe('String calculator', function () {
  describe('Add function', function () {
    it('should return 0 when empty string is provided', function () {
      var result = add('');

      result.should.be.a('number');
      result.should.be.equal(0);
    });

    it('should return 1 when "1" is provided', function () {
      add('1').should.be.equal(1);
    });

    it('should return the sum of both numbers', function () {
      add('1,2').should.be.equal(3);
    });

    it('should return the sum of all numbers', function () {
      add('1,3,5,6,2').should.be.equal(17);
    });

    it('should not add numbers greater than 1000', function () {
      add('1000, 3, 1002').should.be.equal(1003);
    });
  });

  describe('Delimiters', function () {
    it('should accept new lines as separators', function () {
      add('7,3\n4').should.be.equal(14);
    });

    it('should accept custom separators', function () {
      add('//;\n1;3;5').should.be.equal(9);
    });

    it('should accept custom separators along with default ones', function () {
      add('//_\n6,7\n1_2').should.be.equal(16);
    });

    it('should accept multi-char custom delimiter', function () {
      add('//[***]\n1***2***7').should.be.equal(10);
    });
  });

  describe('Negative number error', function () {
    it('should throw a RangeError when a negative number is found', function () {
      var evaluator = function () {
        add('4,-3,5');
      };

      evaluator.should.throw(RangeError);
    });

    it('should throw an error including a negative value', function () {
      var evaluator = function () {
        add('4,-3,5');
      };

      evaluator.should.throw(RangeError, /^Negatives not allowed: -\d$/);
    });

    it('should throw an error including list of negative values', function () {
      var evaluator = function () {
        add('4,-3,-5, 6, -10');
      };

      evaluator.should.throw(RangeError, /^Negatives not allowed: (?:-\d+,)*-\d+$/);
    });
  });
});