import { z } from 'zod';

export const passwordRequirements =
	'Password should have at least 8 characters, contain one uppercase, and one number.';

export const usernameSchema = z
	.string()
	.trim()
	.min(4, {
		message: 'Username must be at least 4 characters.',
	})
	.max(50, { message: 'Username has a maximum of 50 characters.' })
	.refine((val) => validateNoSpaces(val), {
		message:
			'Usernames cannot contain spaces. You can use _ or - if you would like instead.',
	});

export const trailNameSchema = z
	.string()
	.trim()
	.min(2, {
		message: 'Trail name must be at least 2 characters.',
	})
	.max(100, { message: 'Trail name has a maximum of 100 characters.' })
	.or(z.literal(''));

export const emailSchema = z.string().trim().email('Please provide a valid email.');

export const passwordSchema = z
	.string()
	.trim()
	.min(8, {
		message: passwordRequirements,
	})
	.regex(/[a-z]/, {
		message: passwordRequirements,
	})
	.regex(/[A-Z]/, {
		message: passwordRequirements,
	})
	.regex(/[0-9]/, {
		message: passwordRequirements,
	});

export const packUrlSchema = z
	.string()
	.trim()
	.refine((val) => val.includes('https://lighterpack.com/r/'), {
		message: 'Please include a valid pack URL we can import.',
	});

// table row schemas

export const weightSchema = z.coerce
	.number({ invalid_type_error: 'Please include a valid number for pack weight.' })
	.nonnegative({ message: 'Make sure your pack weight is a positive number.' })
	.lte(10000, { message: 'Please include a valid weight for your pack item.' })
	.safe();

export const quantitySchema = z.coerce
	.number({ invalid_type_error: 'Please include a valid number for item quantity.' })
	.nonnegative({ message: 'Make sure your quantity is a positive number.' })
	.lte(100, { message: 'Please include a valid quantity for your pack item.' })
	.safe();

export const priceSchema = z.coerce
	.number({ invalid_type_error: 'Please include a valid price.' })
	.nonnegative({ message: 'Make sure your price is a positive number.' })
	.lte(10000, { message: 'Please include a valid price for your pack item.' })
	.safe();

// table row schemas

export const basicInputSchema = (inputName: string, max?: number) => {
	return z
		.string()
		.trim()
		.min(2, { message: `${inputName} must be at least 2 characters.` })
		.max(max || 40, { message: `${inputName} has a maximum of ${max || 40} characters.` })
		.or(z.literal(''));
};

// New field-specific schemas based on database limits
export const firstNameSchema = z
	.string()
	.trim()
	.min(1, { message: 'First name is required.' })
	.max(100, { message: 'First name has a maximum of 100 characters.' });

export const lastNameSchema = z
	.string()
	.trim()
	.min(1, { message: 'Last name is required.' })
	.max(100, { message: 'Last name has a maximum of 100 characters.' });

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

export const userLocationSchema = z
	.string()
	.trim()
	.max(100, { message: 'Location has a maximum of 100 characters.' })
	.or(z.literal(''));

const validateNoSpaces = (input: string) => {
	let filterSpaces = /^\S*$/;
	const regex = new RegExp(filterSpaces);
	return regex.test(input);
};
