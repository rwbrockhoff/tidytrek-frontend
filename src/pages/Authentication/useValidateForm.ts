import { validPassword, validEmail, passwordRequirements } from './authHelper';
import { type FormError } from '../../types/formTypes';
import { RegisterUserFormData } from '../../types/userTypes';

export const useValidateForm = (setFormError: (error: FormError) => void) => {
	const invalidForm = (
		message: string = 'Please make sure to fill out form properly.',
	) => {
		setFormError({ error: true, message });
	};

	const validateFormData = (formData: RegisterUserFormData) => {
		const { firstName, lastName, email, password } = formData;
		// validate name when registering
		if (!firstName || !lastName) {
			invalidForm('Please type in your name.');
			return false;
		}
		// validate email
		else if (!email || !validEmail(email)) {
			invalidForm('Please include a valid email address.');
			return false;
		} else if (!password) {
			invalidForm('Please type in your password.');
			return false;
		}
		// validate password
		else if (!validPassword(password)) {
			invalidForm(passwordRequirements);
			return false;
		} else {
			return true;
		}
	};

	return { invalidForm, validateFormData };
};
