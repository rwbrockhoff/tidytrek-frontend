import { z } from 'zod';

export const packUrlSchema = z
	.string()
	.trim()
	.refine((val) => val.includes('https://lighterpack.com/r/'), {
		message: 'Please include a valid pack URL we can import.',
	});

export const packNameSchema = z
	.string()
	.trim()
	.min(1, { message: 'Pack name is required.' })
	.max(100, { message: 'Pack name has a maximum of 100 characters.' });

export const packUrlNameSchema = z
	.string()
	.trim()
	.max(100, { message: 'Pack URL name has a maximum of 100 characters.' })
	.or(z.literal(''));

export const packTagSchema = z
	.string()
	.trim()
	.max(50, { message: 'Tag has a maximum of 50 characters.' })
	.or(z.literal(''));

export const packCategoryNameSchema = z
	.string()
	.trim()
	.max(100, { message: 'Category name has a maximum of 100 characters.' })
	.or(z.literal(''));

export const packItemNameSchema = z
	.string()
	.trim()
	.min(1, { message: 'Item name is required.' })
	.max(100, { message: 'Item name has a maximum of 100 characters.' });