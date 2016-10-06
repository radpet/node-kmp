function StringMatcher(word) {
  this.word = word;
  this.table = [];

  this.table[0] = -1;
  this.table[1] = 0;
  for (var i = 2; i < word.length; i++) {
    this.table[i] = 0;
  }

  var position = 2;
  var candidate = 0;

  while (position < word.length) {
    if (word[position - 1] === word[candidate]) {
      this.table[position] = candidate + 1;
      candidate++;
      position++;
    }
    else {
      if (candidate > 0) {
        candidate = this.table[candidate];
      } else {
        this.table[position] = 0;
        position++;
      }
    }
  }
}

/**
 *  Matches the word in a given text
 * @param text The text to look in
 * @param caseInSensitive Whether to threat capital letters and letters equal
 * @returns {number} Returns the index of first match or -1 if it as not matched
 */
StringMatcher.prototype.match = function (text, caseInSensitive) {

  var position = 0;
  var match = 0;

  while (match + position < text.length) {
    if (this._equal(this.word[position], text[match + position], caseInSensitive)) {
      if (position === this.word.length - 1) {
        return match;
      }
      position++;
    } else {
      if (this.table[position] > -1) {
        match = match + position - this.table[position];
        position = this.table[position];
      } else {
        match++;
        position = 0;
      }
    }
  }

  return -1;
};
/**
 * Compares if two letters are equal
 * @param a Letter
 * @param b Letter
 * @param caseInSensitive Whether to distinguish capital and lowercase letters
 * @private
 */
StringMatcher.prototype._equal = function (a, b, caseInSensitive) {
  if (caseInSensitive) {
    return this._toLowercase(a) === this._toLowercase(b);
  }
  return a === b;
};

/**
 * Transforms letter to lower case
 * @param letter
 * @private
 */
StringMatcher.prototype._toLowercase = function (letter) {
  return letter.toLowerCase();
};

module.exports = StringMatcher;

