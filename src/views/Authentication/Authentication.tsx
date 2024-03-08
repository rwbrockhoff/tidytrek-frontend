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
import supabase from '../../api/supabaseClient';

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

	const [formData, setFormData] = useState<RegisterUserFormData>(initialFormState);

	const handleFormChange = (e: InputEvent | CheckboxEvent) => {
		if (isInputEvent(e)) setFormInput<RegisterUserFormData>(e, setFormData);
		else {
			setFormData((prev) => ({ ...prev, agreeToTerms: !prev.agreeToTerms }));
		}
	};

	const handleRegister = async () => {
		const formIsValid = validateFormData(formData);
		if (formIsValid) {
			const { email, password } = formData;
			const { data, error } = await supabase.auth.signUp({
				email,
				password,
			});
			const userId = data?.user && data.user.id;
			if (userId && !error) registerUser({ ...formData, userId });
			else invalidForm(registerError);
		}
	};

	const handleFormSubmit = async () => {
		if (isRegisterForm) return await handleRegister();
		else {
			const { email, password } = formData;
			if (email && password) {
				const { data, error } = await supabase.auth.signInWithPassword({
					email,
					password,
				});
				const userId = data?.user && data.user.id;
				if (userId && !error) loginUser({ userId, email });
				else invalidForm(signinError);
			} else {
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

const signinError = 'There was an error logging in.';
const registerError = 'There was an error registering your account.';
