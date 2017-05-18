'use strict';

const expect = require('chai').expect;

describe('Example', () => {
  describe('Test1', () => {
    it('should return positive value of given negative number', () => {
      expect(Math.abs(-5)).to.be.equal(5);
    });

    it('should return positive value of given positive number', () => {
      expect(Math.abs(3)).to.be.equal(3);
    });

    it('should return 0 given 0', () => {
      expect(Math.abs(0)).to.be.equal(0);
    });
  });
});
