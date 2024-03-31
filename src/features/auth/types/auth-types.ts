import { FormError } from '@/types/form-types';

export type WelcomeFormData = { username: string; trailName: string };

export type FormErrors = { [n: string]: FormError };

export type ResetPasswordData = {
	email: string;
	password: string;
	confirmPassword: string;
};
