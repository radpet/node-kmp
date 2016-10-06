var expect = require('chai').expect;
var StringMatcher = require('../src/string-matcher');

describe('Tests for string matcher', function () {

  it('should create partial match table for "abcdab" ', function () {
    var matcher = new StringMatcher('abcdab');
    expect(matcher.table).to.deep.equal([-1, 0, 0, 0, 0, 1]);
  });

  it('should create partial match table for "abcdabcd" ', function () {
    var matcher = new StringMatcher('abcdabcd');
    expect(matcher.table).to.deep.equal([-1, 0, 0, 0, 0, 1, 2, 3]);
  });

  it('should create partial match table for "aabbaa"', function () {
    var matcher = new StringMatcher('aabbaa');
    expect(matcher.table).to.deep.equal([-1, 0, 1, 0, 0, 1]);
  });

  [
    {
      word: 'a',
      text: 'b'
    },
    {
      word: 'ab',
      text: 'ba'
    },
    {
      word: 'abcde',
      text: 'abcdf'
    }
  ].forEach(function (test) {
    it('should not match ' + test.word + ' inside ' + test.text, function () {
      var matcher = new StringMatcher(test.word);
      expect(matcher.match(test.text)).to.equal(-1);
    });
  });

  [
    {
      word: 'a',
      text: 'A',
      result: 0
    },
    {
      word: 'a',
      text: 'bA',
      result: 1
    },
    {
      word: 'aB',
      text: 'Ab',
      result: 0
    },
    {
      word: 'AaAa',
      text: 'aAaA',
      result: 0
    },
    {
      word:'АсА',
      text:'аса',
      result:0
    },
  ].forEach(function (test) {
    it('should match ' + test.word + ' inside ' + test.text + ' (case insensitive)', function () {
      var matcher = new StringMatcher(test.word);
      expect(matcher.match(test.text, true)).to.equal(test.result);
    });
  });

  [
    {
      word: 'a',
      text: 'ab',
      result: 0
    },
    {
      word: 'ab',
      text: 'bab',
      result: 1
    },
    {
      word: 'abcde',
      text: 'ooooo abcde oooooo',
      result: 6
    }
  ].forEach(function (test) {
    it('should match ' + test.word + ' inside ' + test.text, function () {
      var matcher = new StringMatcher(test.word);
      expect(matcher.match(test.text)).to.equal(test.result);
    });
  });

});