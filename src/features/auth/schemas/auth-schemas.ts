import { z } from 'zod';
import { emailSchema, passwordSchema } from '@/schemas/auth-schemas';
import { firstNameSchema, lastNameSchema } from '@/schemas/user-schemas';

export const registerSchema = z.object({
	firstName: firstNameSchema,
	lastName: lastNameSchema,
	email: emailSchema,
	password: passwordSchema,
});

export const loginSchema = z.object({
	email: emailSchema,
	password: z.string().min(8, { message: 'Please type in your password' }),
});

export const resetRequestSchema = z.object({
	email: emailSchema,
});

export const resetConfirmSchema = z
	.object({
		password: passwordSchema,
		confirmPassword: passwordSchema,
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: 'Passwords do not match.',
		path: ['confirmPassword'],
	});