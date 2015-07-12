'use strict';

var _ = require('lodash');

function hasCustomDelimiter(expression) {
  return /^\/\//.test(expression)
}

function getCustomDelimiter(expression) {
  return expression.charAt(2);
}

function getTokens(expression) {
  var delimiters = [',', '\n'];
  var expr = expression;

  if (hasCustomDelimiter(expression)) {
    delimiters.push(getCustomDelimiter(expr));
    expr = expr.substring(expr.indexOf('\n') + 1);
  }

  var delimitersRegex = new RegExp(delimiters.join('|'));

  return expr.split(delimitersRegex);
}

function calculateSum(tokens) {
  var sum = 0;
  var negatives = [];

  _.each(tokens, function (token) {
    var number = parseInt(token || 0);

    if (number < 0)
      negatives.push(number);

    sum += number <= 1000 ? number : 0;
  });

  if (negatives.length > 0)
    throw new RangeError('Negatives not allowed: ' + negatives);

  return sum;
}

function add(expression) {
  if (!expression)
    return 0;

  var tokens = getTokens(expression);

  return calculateSum(tokens);
}

module.exports = add;