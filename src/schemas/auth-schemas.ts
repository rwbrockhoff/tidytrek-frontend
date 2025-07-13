import { z } from 'zod';

export const passwordRequirements =
	'Password should have at least 8 characters, contain one uppercase, and one number.';

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

const validateNoSpaces = (input: string) => {
	let filterSpaces = /^\S*$/;
	const regex = new RegExp(filterSpaces);
	return regex.test(input);
};

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