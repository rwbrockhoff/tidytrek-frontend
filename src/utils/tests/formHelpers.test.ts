import { searchMatch, isInputEvent } from '../formHelpers';

describe('formHelpers', () => {
  describe('searchMatch', () => {
    it('should match exact text (case insensitive)', () => {
      expect(searchMatch('tent', 'Tent', 'i')).toBe(true);
      expect(searchMatch('TENT', 'tent', 'i')).toBe(true);
    });

    it('should match partial text', () => {
      expect(searchMatch('back', 'Backpacking Tent', 'i')).toBe(true);
      expect(searchMatch('pack', 'Ultralight Backpack', 'i')).toBe(true);
    });

    it('should handle spaces in search and item name', () => {
      expect(searchMatch('hiking boots', 'My Hiking Boots', 'i')).toBe(true);
      expect(searchMatch(' tent ', 'Big Agnes Tent', 'i')).toBe(true);
    });

    it('should return false for non-matches', () => {
      expect(searchMatch('sleeping', 'Hiking Boots', 'i')).toBe(false);
      expect(searchMatch('xyz', 'Tent', 'i')).toBe(false);
    });

    it('should handle null/undefined item names', () => {
      expect(searchMatch('tent', null, 'i')).toBe(false);
      expect(searchMatch('tent', undefined, 'i')).toBe(false);
    });

    it('should handle empty search strings', () => {
      expect(searchMatch('', 'Tent', 'i')).toBe(false);
      // Spaces get stripped, making empty regex that matches everything
      expect(searchMatch('   ', 'Tent', 'i')).toBe(true);
    });

    it('should respect regex conditions', () => {
      // Case sensitive
      expect(searchMatch('Tent', 'tent', '')).toBe(false);
      expect(searchMatch('Tent', 'Tent', '')).toBe(true);
      
      // Global match
      expect(searchMatch('a', 'banana', 'g')).toBe(true);
    });
  });

  describe('isInputEvent', () => {
    it('should return true for input change events', () => {
      const inputEvent = { type: 'change', target: { value: 'test' } } as any;
      expect(isInputEvent(inputEvent)).toBe(true);
    });

    it('should return false for non-change events', () => {
      const clickEvent = { type: 'click', target: { value: 'test' } } as any;
      expect(isInputEvent(clickEvent)).toBe(false);
    });
  });
});