import { type RegisterUser } from '../../types/userTypes';
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

const Authentication = ({ isRegisterForm }: { isRegisterForm: boolean }) => {
	const loginData = useLoginMutation();
	const registerData = useRegisterMutation();
	const { mutate: loginUser } = loginData;
	const { mutate: registerUser } = registerData;

	const [formError, setFormError] = useCombineErrors([
		loginData as MutationError,
		registerData as MutationError,
	]);

	const isPending = useCombinePendingStatus([
		loginData as MutationPending,
		registerData as MutationPending,
	]);

	const { invalidForm, validateFormData } = useValidateForm(setFormError);

	const [formData, setFormData] = useState<RegisterUser>({
		firstName: '',
		lastName: '',
		username: '',
		trailName: '',
		email: '',
		password: '',
		confirmPassword: '',
		agreeToTerms: false,
	});

	const handleFormChange = (e: InputEvent | CheckboxEvent) => {
		if (isInputEvent(e)) setFormInput<RegisterUser>(e, setFormData);
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
				isLoading={isPending}
				formError={formError}
				onFormChange={handleFormChange}
				onSubmit={handleFormSubmit}
			/>
		</AuthContainer>
	);
};

export default Authentication;
