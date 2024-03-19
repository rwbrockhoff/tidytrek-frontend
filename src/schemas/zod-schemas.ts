import { z } from 'zod';

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
