import { validPassword } from '@/features/auth/utils/auth-helpers';
import { z } from 'zod';

const passwordRequirements =
	'Password should have at least 8 characters, contain one uppercase, and one number.';

export const usernameSchema = z
	.string()
	.trim()
	.min(4, {
		message: 'Username must be at least 4 characters.',
	})
	.max(30, { message: 'Username has a maximum of 20 characters.' })
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
	.max(20, { message: 'Trail name has a maximum of 20 characters.' })
	.or(z.literal(''));

export const emailSchema = z.string().trim().email('Please provide a valid email.');

export const passwordSchema = z
	.string()
	.trim()
	.min(8, {
		message: passwordRequirements,
	})
	.superRefine((password, checkPassComplexity) => {
		if (!validPassword(password)) {
			checkPassComplexity.addIssue({
				code: 'custom',
				path: ['password'],
				message: passwordRequirements,
			});
		}
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
		.max(40 || max, { message: `${inputName} has a maximum of 40 characters.` })
		.or(z.literal(''));
};

const validateNoSpaces = (input: string) => {
	let filterSpaces = /^\S*$/;
	const regex = new RegExp(filterSpaces);
	return regex.test(input);
};
