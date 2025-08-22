import { z } from 'zod';
import { normalizeURL } from '@/utils/link-utils';

// Common string validations

export const stringSchema = (maxLength: number) =>
	z
		.string()
		.trim()
		.max(maxLength, { message: `Max of ${maxLength} characters allowed.` })
		.nullish()
		.or(z.literal(''));

export const string50 = stringSchema(50);
export const string100 = stringSchema(100);
export const string200 = stringSchema(200);
export const string250 = stringSchema(250);

export const requiredStringSchema = (maxLength: number) =>
	z
		.string()
		.trim()
		.min(1, { message: 'This field is required.' })
		.max(maxLength, { message: `Max of ${maxLength} characters allowed.` });

export const requiredString50 = requiredStringSchema(50);
export const requiredString100 = requiredStringSchema(100);
export const requiredString200 = requiredStringSchema(200);
export const requiredString250 = requiredStringSchema(250);

// Common URL validations

const isValidUrl = (url: string) => {
	try {
		const urlObj = new URL(url);
		const hostname = urlObj.hostname;
		// Must have at least one dot (TLD) and valid domain format
		return /^[a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?(\.[a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/.test(
			hostname,
		);
	} catch {
		return false;
	}
};

// Optional URL (allows empty/null/undefined)
export const urlSchema = z
	.string()
	.trim()
	.nullish()
	.or(z.literal(''))
	.refine(
		(val) => {
			if (!val) return true; // Allow empty
			const normalized = normalizeURL(val);
			if (normalized === '') return false;
			return isValidUrl(normalized);
		},
		{
			message: 'Please enter a valid https URL.',
		},
	);

// Required URL (must be a valid URL, cannot save invalid results)
export const requiredUrlSchema = z
	.string()
	.trim()
	.min(1, { message: 'URL is required.' })
	.refine(
		(val) => {
			const normalized = normalizeURL(val);
			if (normalized === '') return false;
			return isValidUrl(normalized);
		},
		{
			message: 'Please enter a valid https URL.',
		},
	);
