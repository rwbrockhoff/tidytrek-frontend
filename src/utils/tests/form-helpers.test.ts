import { searchMatch, isInputEvent } from '../form-helpers';
import type { InputEvent, CheckboxEvent } from '@/types/form-types';

describe('formHelpers', () => {
  describe('searchMatch', () => {
    it('should match exact text (case insensitive)', () => {
      expect(searchMatch('tent', 'Tent')).toBe(true);
      expect(searchMatch('TENT', 'tent')).toBe(true);
    });

    it('should match partial text', () => {
      expect(searchMatch('back', 'Backpacking Tent')).toBe(true);
      expect(searchMatch('pack', 'Ultralight Backpack')).toBe(true);
    });

    it('should handle spaces in search and item name', () => {
      expect(searchMatch('hiking boots', 'My Hiking Boots')).toBe(true);
      expect(searchMatch(' tent ', 'Big Agnes Tent')).toBe(true);
    });

    it('should return false for non-matches', () => {
      expect(searchMatch('sleeping', 'Hiking Boots')).toBe(false);
      expect(searchMatch('xyz', 'Tent')).toBe(false);
    });

    it('should handle null/undefined item names', () => {
      expect(searchMatch('tent', null)).toBe(false);
      expect(searchMatch('tent', undefined)).toBe(false);
    });

    it('should handle empty search strings', () => {
      expect(searchMatch('', 'Tent')).toBe(false);
      // Spaces get stripped, making empty regex that matches everything
      expect(searchMatch('   ', 'Tent')).toBe(true);
    });

    it('should respect case sensitivity options', () => {
      // Case sensitive
      expect(searchMatch('Tent', 'tent', { caseSensitive: true })).toBe(false);
      expect(searchMatch('Tent', 'Tent', { caseSensitive: true })).toBe(true);
      
      // Case insensitive (default)
      expect(searchMatch('Tent', 'tent')).toBe(true);
    });
  });

  describe('isInputEvent', () => {
    it('should return true for input change events', () => {
      const inputEvent = { type: 'change', target: { value: 'test' } } as InputEvent;
      expect(isInputEvent(inputEvent)).toBe(true);
    });

    it('should return false for non-change events', () => {
      const clickEvent = { type: 'click', target: { value: 'test' } } as unknown as CheckboxEvent;
      expect(isInputEvent(clickEvent)).toBe(false);
    });
  });
});