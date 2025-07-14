import { describe, expect, it } from 'vitest';
import { sort } from '../src/sort';

describe('sort Tests', async () => {
  describe('When negative values are passed', () => {
    it('should throw an error', () => {
      expect(() => sort(-1, 1, 1, 1)).toThrow('All measurements must be positive');

      expect(() => sort(1, -1, 1, 1)).toThrow('All measurements must be positive');

      expect(() => sort(1, 1, -1, 1)).toThrow('All measurements must be positive');

      expect(() => sort(1, 1, 1, -1)).toThrow('All measurements must be positive');
    });
  });
  describe('When package is heavy', () => {
    it('should be SPECIAL', () => {
      expect(sort(150, 1, 1, 1)).toBe('SPECIAL');
      expect(sort(1, 150, 1, 1)).toBe('SPECIAL');
      expect(sort(1, 1, 150, 1)).toBe('SPECIAL');
      expect(sort(100, 100, 100, 1)).toBe('SPECIAL');
    });
  });
  describe('When mass is greater than or equal to 20', () => {
    it('should be SPECIAL', () => {
      expect(sort(1, 1, 1, 20)).toBe('SPECIAL');
    });
  });
  describe('When package is bulky and heavy', () => {
    it('should be REJECTED', () => {
      expect(sort(150, 1, 1, 20)).toBe('REJECTED');
    });
  });
  describe('When package is neither bulky nor heavy', () => {
    it('should be STANDARD', () => {
      expect(sort(1, 1, 1, 1)).toBe('STANDARD');
    });
  });
});
