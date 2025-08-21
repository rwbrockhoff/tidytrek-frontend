import { type LoginUserFormData } from '@/types/user-types';
import { useLoginMutation } from '@/queries/user-queries';
import { useZodError } from '@/hooks/form/use-zod-error';
import { extractErrorMessage } from '@/utils/error-utils';
import { loginSchema } from '../../../schemas/auth-schemas';

export const useLoginFlow = () => {
	const loginData = useLoginMutation();
	const { mutateAsync: loginUserAsync, reset: resetLogin } = loginData;

	const { formErrors, updateFormErrors, resetFormErrors, resetAllFormErrors } =
		useZodError<LoginUserFormData>(['email', 'password']);

	const handleLogin = async (
		formData: LoginUserFormData,
		setAxiosError: (error: string) => void,
	) => {
		// Validation
		const schemaData = loginSchema.safeParse(formData);
		if (!schemaData.success) {
			updateFormErrors(schemaData.error.issues);
			return;
		}

		// Login user
		try {
			await loginUserAsync(formData);
		} catch (error) {
			setAxiosError(extractErrorMessage(error));
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
