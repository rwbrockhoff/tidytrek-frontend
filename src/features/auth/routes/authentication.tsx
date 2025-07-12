import { type RegisterUserFormData, type LoginUserFormData } from '@/types/user-types';
import { useEffect } from 'react';
import { LogInForm } from '../components/login-form';
import { useCombineErrors, type MutationError } from '../hooks/use-combine-errors';
import {
	useCombinePendingStatus,
	type MutationPending,
} from '../hooks/use-combine-status';
import { useLoginMutation, useRegisterMutation } from '@/queries/user-queries';
import { AuthContainer } from '../components/form-components/form-components';
import supabase from '@/api/supabaseClient';
import { frontendURL } from '@/api/tidytrekAPI';
import { useLocation } from 'react-router-dom';
import { useMutationErrors } from '@/hooks/form/use-axios-error';
import { useZodError } from '@/hooks/form/use-zod-error';
import {
	z,
	emailSchema,
	passwordSchema,
	firstNameSchema,
	lastNameSchema,
} from '@/schemas';

const registerSchema = z.object({
	firstName: firstNameSchema,
	lastName: lastNameSchema,
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
	const { mutate: loginUser, reset: resetLogin } = loginData;
	const {
		mutate: registerUser,
		isSuccess: isRegisterSuccess,
		reset: resetRegister,
	} = registerData;

	const { formErrors, updateFormErrors, resetFormErrors, resetAllFormErrors } =
		useZodError<RegisterUserFormData>(['firstName', 'lastName', 'email', 'password']);

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
		// Clear alls inputs/state when route changes (login <-> register)
		// Including existing success/error messages
		resetAllFormErrors();
		if (serverError.error) resetAxiosError(); // Only clear if there's an error
		resetLogin();
		resetRegister();
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
		// sign up user using Supabase
		const { data, error } = await supabase.auth.signUp({
			email,
			password,
			options: {
				emailRedirectTo: `${frontendURL}/welcome`,
			},
		});

		// handle Supabase error
		if (!data.user || error) return setAxiosError(registerError);

		// Always register user in backend database
		const userId = data.user.id;
		const supabaseRefreshToken = data?.session?.refresh_token;

		registerUser({
			...formData,
			userId,
			supabaseRefreshToken,
		});
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

		// handle Supabase error
		if (!data.user || error) return setAxiosError(signinError);

		// otherwise log in
		const userId = data?.user && data.user.id;
		const supabaseRefreshToken = data?.session?.refresh_token;
		if (userId && !error) {
			loginUser({
				userId,
				email,
				supabaseRefreshToken,
			});
		}
	};

	const handleClearErrors = (inputName?: string) => {
		resetFormErrors(inputName);
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
