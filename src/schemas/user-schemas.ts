import { z } from 'zod';

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

export const userLocationSchema = z
	.string()
	.trim()
	.max(100, { message: 'Location has a maximum of 100 characters.' })
	.or(z.literal(''));

export const trailNameSchema = z
	.string()
	.trim()
	.min(4, {
		message: 'Trail name must be at least 4 characters.',
	})
	.max(40, { message: 'Trail name has a max of 40 characters.' })
	.or(z.literal(''));
