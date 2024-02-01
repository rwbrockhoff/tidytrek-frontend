import LogInForm from '../../components/Authentication/LogInForm/LogInForm';
import { Grid } from 'semantic-ui-react';
import { useState } from 'react';
import { setFormInput } from '../../shared/formHelpers';
import { useValidateForm } from './useValidateForm';
import { useCombineErrors, type MutationError } from './useCombineErrors';
import { useCombinePendingStatus, type MutationPending } from './useCombinePendingStatus';
import { ReactInput } from '../../types/generalTypes';
import { useLoginMutation, useRegisterMutation } from '../../store/userQueries';

type AuthProps = {
	isRegisterForm: boolean;
};

type FormData = {
	name: string;
	username: string;
	email: string;
	password: string;
	confirmPassword: string;
};

const Authentication = (props: AuthProps) => {
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

	const [formData, setFormData] = useState<FormData>({
		name: '',
		username: '',
		email: '',
		password: '',
		confirmPassword: '',
	});

	const handleFormChange = (e: ReactInput) => setFormInput<FormData>(e, setFormData);

	const handleFormSubmit = () => {
		const { name, username, email, password } = formData;
		if (props.isRegisterForm) {
			const formIsValid = validateFormData(formData);
			formIsValid && registerUser({ name, username, email, password });
		} else {
			if (email && password) loginUser({ email, password });
			else {
				invalidForm('Please provide your email and password.');
			}
		}
	};

	return (
		<Grid textAlign="center" style={{ height: '100vh' }} verticalAlign="middle">
			<LogInForm
				isRegisterForm={props.isRegisterForm}
				isLoading={isPending}
				formError={formError}
				onFormChange={handleFormChange}
				onSubmit={handleFormSubmit}
			/>
		</Grid>
	);
};

export default Authentication;
