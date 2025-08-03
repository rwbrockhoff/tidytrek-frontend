import { describe, it, expect } from 'vitest';
import { normalizeURL } from '../link-utils';

describe('normalizeURL', () => {
	it('returns empty string for empty input', () => {
		expect(normalizeURL('')).toBe('');
	});

	it('leaves https URLs unchanged', () => {
		expect(normalizeURL('https://example.com')).toBe('https://example.com');
		expect(normalizeURL('https://example.com/path?query=value')).toBe(
			'https://example.com/path?query=value',
		);
	});

	it('converts http to https', () => {
		expect(normalizeURL('http://example.com')).toBe('https://example.com');
		expect(normalizeURL('http://example.com/path')).toBe('https://example.com/path');
	});

	it('adds https protocol to bare domains', () => {
		expect(normalizeURL('example.com')).toBe('https://example.com');
		expect(normalizeURL('www.example.com')).toBe('https://www.example.com');
		expect(normalizeURL('example.com/path')).toBe('https://example.com/path');
	});
});
