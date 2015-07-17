'use strict';

var _ = require('lodash');

function hasCustomDelimiter(expression) {
  return /^\/\//.test(expression)
}

function hasMultiCharacterDelimiter(expression) {
  return /\[[^\[\]\d\s]+\]/.test(expression);
}

function getMultiCharacterDelimiter(expression) {
  var delimiters = expression.match(/\[[^\[\]\s]+\]/g);

  for (var i = 0; i < delimiters.length; i++) {
    delimiters[i] = delimiters[i].replace('[', '').replace(']', '')
  }

  return delimiters;
}

function getCustomDelimiters(expression) {
  if (hasMultiCharacterDelimiter(expression))
    return getMultiCharacterDelimiter(expression);

  return [expression.charAt(2)];
}

function splitExpression(expressionPieces, delimiters) {
  if (delimiters.length === 0)
    return expressionPieces;

  var pieces = [];
  var delimiter = delimiters.pop();

  for (var i = 0; i < expressionPieces.length; i++) {
    pieces = pieces.concat(expressionPieces[i].split(delimiter));
  }

  return splitExpression(pieces, delimiters);
}

function getTokens(expression) {
  var delimiters = [',', '\n'];
  var expr = expression;

  if (hasCustomDelimiter(expression)) {
    delimiters = delimiters.concat(getCustomDelimiters(expr));
    expr = expr.substring(expr.indexOf('\n') + 1);
  }

  var tokens = splitExpression([expr], delimiters);

  return tokens;
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
