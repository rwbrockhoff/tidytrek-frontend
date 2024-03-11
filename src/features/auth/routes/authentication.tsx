import { RegisterUserFormData } from '../../../types/userTypes';
import { type InputEvent } from '../../../types/formTypes';
import { isInputEvent } from '../../../utils/formHelpers';
import LogInForm from '../components/login-form';
import { useEffect, useState } from 'react';
import { setFormInput } from '../../../utils/formHelpers';
import { useValidateForm } from '../hooks/use-validate-form';
import { useCombineErrors, type MutationError } from '../hooks/use-combine-errors';
import {
	useCombinePendingStatus,
	type MutationPending,
} from '../hooks/use-combine-status';
import { useLoginMutation, useRegisterMutation } from '../../../queries/userQueries';
import { AuthContainer } from '../components/form-components';
import supabase from '../../../api/supabaseClient';
import { frontendURL } from '../../../api/tidytrekAPI';
import { useLocation } from 'react-router-dom';

const initialFormState = {
	firstName: '',
	lastName: '',
	email: '',
	password: '',
};

export const Authentication = ({ isRegisterForm }: { isRegisterForm: boolean }) => {
	const { pathname } = useLocation();
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

	useEffect(() => {
		// subscribe to view change and reset form errors
		if (formError.error) setFormError({ error: false, message: '' });
	}, [pathname]);

	const handleFormChange = (e: InputEvent) => {
		if (isInputEvent(e)) setFormInput<RegisterUserFormData>(e, setFormData);
	};

	const handleRegister = async () => {
		const formIsValid = validateFormData(formData);
		if (!formIsValid) return; // error messages automatically handled
		const { email, password } = formData;
		const { data, error } = await supabase.auth.signUp({
			email,
			password,
			options: {
				emailRedirectTo: `${frontendURL}/welcome`,
			},
		});
		// handle supabase error
		if (!data.user || error) return invalidForm(registerError);
		// otherwise register account
		const userId = data?.user && data.user.id;
		if (userId) {
			registerUser({ ...formData, userId });
			setFormData(initialFormState);
		}
	};

	const handleFormSubmit = async () => {
		if (isRegisterForm) return await handleRegister();
		const { email, password } = formData;
		if (!email || !password) return invalidForm(emptyFormError);
		const { data, error } = await supabase.auth.signInWithPassword({
			email,
			password,
		});
		// handle supabase error
		if (!data.user || error) return invalidForm(signinError);
		// otherwise log in
		const userId = data?.user && data.user.id;
		if (userId && !error) loginUser({ userId, email });
	};

	return (
		<AuthContainer>
			<LogInForm
				isRegisterForm={isRegisterForm}
				isRegisterSuccess={isRegisterSuccess}
				formData={formData}
				isLoading={isPending}
				formError={formError}
				invalidForm={invalidForm}
				onFormChange={handleFormChange}
				onSubmit={handleFormSubmit}
			/>
		</AuthContainer>
	);
};

// defaults
const signinError = 'Invalid login credentials.';
const registerError = 'There was an error registering your account.';
const emptyFormError = 'Please provide your email and password.';
