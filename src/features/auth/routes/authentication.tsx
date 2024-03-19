import { type RegisterUserFormData, type LoginUserFormData } from '@/types/user-types';
import { useEffect } from 'react';
import { LogInForm } from '../components/login-form';
import { useCombineErrors, type MutationError } from '../hooks/use-combine-errors';
import {
	useCombinePendingStatus,
	type MutationPending,
} from '../hooks/use-combine-status';
import { useLoginMutation, useRegisterMutation } from '@/queries/user-queries';
import { AuthContainer } from '../components/form-components';
import supabase from '@/api/supabaseClient';
import { frontendURL } from '@/api/tidytrekAPI';
import { useLocation } from 'react-router-dom';
import { useMutationErrors, useZodError } from '@/hooks';
import { z, emailSchema, passwordSchema } from '@/schemas';

const registerSchema = z.object({
	firstName: z.string().min(2, { message: 'Please type in your name.' }),
	lastName: z.string().min(2, { message: 'Please type in your last name.' }),
	email: emailSchema,
	password: passwordSchema,
});

const loginSchema = z.object({
	email: emailSchema,
	password: z.string().min(8, { message: 'Please type in your password' }),
});

export const Authentication = ({ isRegisterForm }: { isRegisterForm: boolean }) => {
	const { pathname } = useLocation();
	const loginData = useLoginMutation();
	const registerData = useRegisterMutation();
	const { mutate: loginUser } = loginData;
	const { mutate: registerUser, isSuccess: isRegisterSuccess } = registerData;

	const { formErrors, updateFormErrors, resetFormErrors } = useZodError([
		'firstName',
		'lastName',
		'email',
		'password',
	]);

	const { serverError, updateAxiosError, resetAxiosError, setAxiosError } =
		useMutationErrors();

	const [formError] = useCombineErrors([
		loginData as MutationError,
		registerData as MutationError,
	]);

	const isPending = useCombinePendingStatus([
		loginData as MutationPending,
		registerData as MutationPending,
	]);

	useEffect(() => {
		// subscribe to view change and reset errors
		if (formError.error) resetAxiosError();
	}, [pathname]);

	useEffect(() => {
		// subscribe to query errors
		formError.error && updateAxiosError(formError.message);
	}, [formError.error]);

	const handleRegister = async (formData: RegisterUserFormData) => {
		// validate register form
		const schemaData = registerSchema.safeParse(formData);
		if (!schemaData.success) {
			const result = JSON.parse(schemaData.error.message);
			return updateFormErrors(result);
		}
		const { email, password } = formData;
		// sign up user using supabase
		const { data, error } = await supabase.auth.signUp({
			email,
			password,
			options: {
				emailRedirectTo: `${frontendURL}/welcome`,
			},
		});
		// handle supabase error
		if (!data.user || error) return setAxiosError(registerError);
		// otherwise register account
		const userId = data?.user && data.user.id;
		if (userId) {
			registerUser({ ...formData, userId });
		}
	};

	const handleLogin = async (formData: LoginUserFormData) => {
		const schemaData = loginSchema.safeParse(formData);
		if (!schemaData.success) {
			const result = JSON.parse(schemaData.error.message);
			return updateFormErrors(result);
		}
		const { email, password } = formData;
		const { data, error } = await supabase.auth.signInWithPassword({
			email,
			password,
		});
		// handle supabase error
		if (!data.user || error) return setAxiosError(signinError);
		// otherwise log in
		const userId = data?.user && data.user.id;
		if (userId && !error) loginUser({ userId, email });
	};

	const handleClearErrors = (inputName?: string) => {
		if (inputName) resetFormErrors(inputName);
		if (serverError.error) resetAxiosError();
	};

	return (
		<AuthContainer>
			<LogInForm
				isRegisterForm={isRegisterForm}
				isRegisterSuccess={isRegisterSuccess}
				isLoading={isPending}
				registerUser={handleRegister}
				loginUser={handleLogin}
				formErrors={formErrors}
				serverError={serverError}
				resetFormErrors={handleClearErrors}
				updateServerError={setAxiosError}
			/>
		</AuthContainer>
	);
};

// defaults
const signinError = 'Invalid login credentials.';
const registerError = 'There was an error registering your account.';
