import {
	z,
	emailSchema,
	passwordSchema,
	firstNameSchema,
	lastNameSchema,
} from '@/schemas';

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