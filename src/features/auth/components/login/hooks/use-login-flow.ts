import { type LoginUserFormData } from '@/types/user-types';
import { useLoginMutation } from '@/queries/user-queries';
import { useZodError } from '@/hooks/form/use-zod-error';
import { extractErrorMessage } from '@/utils/error-utils';
import { loginSchema } from '../../../schemas/auth-schemas';

export const useLoginFlow = () => {
	const loginMutation = useLoginMutation();

	const { formErrors, updateFormErrors, resetFormErrors, resetAllFormErrors } =
		useZodError<LoginUserFormData>(['email', 'password']);

	const handleLogin = (
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
		loginMutation.mutate(formData, {
			onError: (error) => setAxiosError(extractErrorMessage(error)),
		});
	};

	return {
		loginMutation,
		formErrors,
		handleLogin,
		resetFormErrors,
		resetAllFormErrors,
	};
};
