import { type LoginUserFormData } from '@/types/user-types';
import { useLoginMutation } from '@/queries/user-queries';
import { useZodError } from '@/hooks/form/use-zod-error';
import supabase from '@/api/supabase-client';
import { loginSchema } from '../schemas/auth-schemas';

const signinError = 'Invalid login credentials.';

export const useLoginFlow = () => {
	const loginData = useLoginMutation();
	const { mutate: loginUser, reset: resetLogin } = loginData;

	const { formErrors, updateFormErrors, resetFormErrors, resetAllFormErrors } =
		useZodError<LoginUserFormData>(['email', 'password']);

	const handleLogin = async (
		formData: LoginUserFormData,
		setAxiosError: (error: string) => void,
	) => {
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

		// Handle Supabase error
		if (!data.user || error) {
			return setAxiosError(signinError);
		}

		// Log in user
		const userId = data.user.id;
		const supabaseRefreshToken = data?.session?.refresh_token;

		if (userId) {
			loginUser({
				userId,
				email,
				supabaseRefreshToken,
			});
		}
	};

	return {
		loginData,
		formErrors,
		handleLogin,
		resetLogin,
		resetFormErrors,
		resetAllFormErrors,
	};
};
