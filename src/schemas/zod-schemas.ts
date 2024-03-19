import { validPassword } from '@/features/auth/utils/auth-helpers';
import { z } from 'zod';

const passwordRequirements =
	'Password should have at least 8 characters, contain one uppercase, and one number.';

export const usernameSchema = z
	.string()
	.min(2, {
		message: 'Username must be at least 2 characters.',
	})
	.max(20, { message: 'Username has a maximum of 20 characters.' })
	.or(z.literal(''));

export const trailNameSchema = z
	.string()
	.min(2, {
		message: 'Trail name must be at least 2 characters.',
	})
	.max(20, { message: 'Trail name has a maximum of 20 characters.' })
	.or(z.literal(''));

export const emailSchema = z.string().email('Please provide a valid email.');

export const passwordSchema = z
	.string()
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
