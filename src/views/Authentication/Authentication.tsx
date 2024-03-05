import { RegisterUserFormData } from '../../types/userTypes';
import { type CheckboxEvent, type InputEvent } from '../../types/formTypes';
import { isInputEvent } from '../../utils/formHelpers';
import LogInForm from '../../components/Authentication/LogInForm/LogInForm';
import { useState } from 'react';
import { setFormInput } from '../../utils/formHelpers';
import { useValidateForm } from './useValidateForm';
import { useCombineErrors, type MutationError } from './useCombineErrors';
import { useCombinePendingStatus, type MutationPending } from './useCombinePendingStatus';
import { useLoginMutation, useRegisterMutation } from '../../queries/userQueries';
import { AuthContainer } from '../../components/Authentication/FormComponents';

const initialFormState = {
	firstName: '',
	lastName: '',
	username: '',
	trailName: '',
	email: '',
	password: '',
	confirmPassword: '',
	agreeToTerms: false,
};

const Authentication = ({ isRegisterForm }: { isRegisterForm: boolean }) => {
	const loginData = useLoginMutation();
	const registerData = useRegisterMutation();
	const { mutate: loginUser } = loginData;
	const { mutate: registerUser, isSuccess: isRegisterSuccess } = registerData;

	const [formError, setFormError] = useCombineErrors([
		loginData as MutationError,
		registerData as MutationError,
	]);

	const isPending = useCombinePendingStatus([
		loginData as MutationPending,
		registerData as MutationPending,
	]);

	const { invalidForm, validateFormData } = useValidateForm(setFormError);

	// type FormData = Omit<RegisterUser, 'userId'> & {
	// 	password: string;
	// 	confirmPassword: string;
	// };

	const [formData, setFormData] = useState<RegisterUserFormData>(initialFormState);

	const handleFormChange = (e: InputEvent | CheckboxEvent) => {
		if (isInputEvent(e)) setFormInput<RegisterUserFormData>(e, setFormData);
		else {
			setFormData((prev) => ({ ...prev, agreeToTerms: !prev.agreeToTerms }));
		}
	};

	const handleFormSubmit = () => {
		if (isRegisterForm) {
			const formIsValid = validateFormData(formData);
			formIsValid && registerUser(formData);
		} else {
			const { email, password } = formData;
			if (email && password) loginUser({ email, password });
			else {
				invalidForm('Please provide your email and password.');
			}
		}
	};

	return (
		<AuthContainer>
			<LogInForm
				isRegisterForm={isRegisterForm}
				isRegisterSuccess={isRegisterSuccess}
				formData={formData}
				isLoading={isPending}
				formError={formError}
				onFormChange={handleFormChange}
				onSubmit={handleFormSubmit}
			/>
		</AuthContainer>
	);
};

export default Authentication;
