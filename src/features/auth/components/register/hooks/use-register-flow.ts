import { type RegisterUserFormData } from '@/types/user-types';
import { useRegisterMutation } from '@/queries/user-queries';
import { useZodError } from '@/hooks/form/use-zod-error';
import { extractErrorMessage } from '@/utils/error-utils';
import { registerSchema } from '../../../schemas/auth-schemas';

export const useRegisterFlow = () => {
	const registerMutation = useRegisterMutation();

	const { formErrors, updateFormErrors, resetFormErrors, resetAllFormErrors } =
		useZodError<RegisterUserFormData>(['firstName', 'lastName', 'email', 'password']);

	const handleRegister = (
		formData: RegisterUserFormData,
		setAxiosError: (error: string) => void,
	) => {
		// Validation
		const schemaData = registerSchema.safeParse(formData);
		if (!schemaData.success) {
			updateFormErrors(schemaData.error.issues);
			return;
		}

		// Register user
		registerMutation.mutate(formData, {
			onError: (error) => setAxiosError(extractErrorMessage(error)),
		});
	};

	return {
		registerMutation,
		formErrors,
		handleRegister,
		resetFormErrors,
		resetAllFormErrors,
	};
};
