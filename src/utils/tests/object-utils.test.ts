import { describe, it, expect } from 'vitest';
import { shallowEqual } from '../object-utils';

describe('shallowEqual', () => {
	it('returns true for identical objects', () => {
		const obj1 = { name: 'Pam', age: 30 };
		const obj2 = { name: 'Pam', age: 30 };

		expect(shallowEqual(obj1, obj2)).toBe(true);
	});

	it('returns true for same object reference', () => {
		const obj = { name: 'Pam', age: 30 };

		expect(shallowEqual(obj, obj)).toBe(true);
	});

	it('returns false for different values', () => {
		const obj1 = { name: 'Pam', age: 30 };
		const obj2 = { name: 'Dwight', age: 32 };

		expect(shallowEqual(obj1, obj2)).toBe(false);
	});

	it('returns false for different number of properties', () => {
		const obj1 = { name: 'Pam' };
		const obj2 = { name: 'Pam', age: 30 };

		expect(shallowEqual(obj1, obj2)).toBe(false);
	});

	it('returns true regardless of property order', () => {
		const obj1 = { name: 'Pam', age: 30 };
		const obj2 = { age: 30, name: 'Pam' };

		expect(shallowEqual(obj1, obj2)).toBe(true);
	});

	it('returns true for empty objects', () => {
		expect(shallowEqual({}, {})).toBe(true);
	});

	it('compares object references shallowly (not deep)', () => {
		const nestedObj = { city: 'Scranton' };
		const obj1 = { name: 'Pam', address: nestedObj };
		const obj2 = { name: 'Pam', address: nestedObj };
		const obj3 = { name: 'Pam', address: { city: 'Scranton' } };

		expect(shallowEqual(obj1, obj2)).toBe(true); // Same reference
		expect(shallowEqual(obj1, obj3)).toBe(false); // Different reference
	});

	it('handles primitive values correctly', () => {
		const obj1 = { str: 'hello', num: 42, bool: true, nullVal: null, undef: undefined };
		const obj2 = { str: 'hello', num: 42, bool: true, nullVal: null, undef: undefined };

		expect(shallowEqual(obj1, obj2)).toBe(true);
	});
});
