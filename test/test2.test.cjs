const assert = require('assert');

describe('Array', function () {
  describe('#indexOf()', function () {
    it.only('should return -1 unless present', function () {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
    it.only('should return -1 when the value is not present', function () {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });

  describe.only('#concat()', function () {
    it.only('should return a new Array', function () {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });

  describe('#slice()', function () {
    it.only('should return a new Array', function () {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });

});

