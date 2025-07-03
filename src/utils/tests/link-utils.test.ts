import { describe, it, expect } from 'vitest';
import { cleanUpLink } from '../link-utils';

describe('cleanUpLink', () => {
	it('returns empty string for empty input', () => {
		expect(cleanUpLink('')).toBe('');
	});

	it('leaves https URLs unchanged', () => {
		expect(cleanUpLink('https://example.com')).toBe('https://example.com');
		expect(cleanUpLink('https://example.com/path?query=value')).toBe('https://example.com/path?query=value');
	});

	it('converts http to https', () => {
		expect(cleanUpLink('http://example.com')).toBe('https://example.com');
		expect(cleanUpLink('http://example.com/path')).toBe('https://example.com/path');
	});

	it('adds https protocol to bare domains', () => {
		expect(cleanUpLink('example.com')).toBe('https://example.com');
		expect(cleanUpLink('www.example.com')).toBe('https://www.example.com');
		expect(cleanUpLink('example.com/path')).toBe('https://example.com/path');
	});
});