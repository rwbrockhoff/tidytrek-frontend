import { type RegisterUserFormData } from '@/types/user-types';
import { useRegisterMutation } from '@/queries/user-queries';
import { useZodError } from '@/hooks/form/use-zod-error';
import supabase from '@/api/supabaseClient';
import { frontendURL } from '@/api/tidytrekAPI';
import { registerSchema } from '../schemas/auth-schemas';

const registerError = 'There was an error registering your account.';

export const useRegisterFlow = () => {
	const registerData = useRegisterMutation();
	const { mutate: registerUser, isSuccess: isRegisterSuccess, reset: resetRegister } = registerData;

	const { formErrors, updateFormErrors, resetFormErrors, resetAllFormErrors } =
		useZodError<RegisterUserFormData>(['firstName', 'lastName', 'email', 'password']);

	const handleRegister = async (formData: RegisterUserFormData, setAxiosError: (error: string) => void) => {
		// Validate register form
		const schemaData = registerSchema.safeParse(formData);
		if (!schemaData.success) {
			const result = JSON.parse(schemaData.error.message);
			return updateFormErrors(result);
		}

		const { email, password } = formData;
		
		// Sign up user using Supabase
		const { data, error } = await supabase.auth.signUp({
			email,
			password,
			options: {
				emailRedirectTo: `${frontendURL}/welcome`,
			},
		});

		// Handle Supabase error
		if (!data.user || error) {
			return setAxiosError(registerError);
		}

		// Register user in backend database
		const userId = data.user.id;
		const supabaseRefreshToken = data?.session?.refresh_token;

		registerUser({
			...formData,
			userId,
			supabaseRefreshToken,
		});
	};

	return {
		registerData,
		isRegisterSuccess,
		formErrors,
		handleRegister,
		resetRegister,
		resetFormErrors,
		resetAllFormErrors,
	};
};