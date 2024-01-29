import LogInForm from '../../components/Authentication/LogInForm/LogInForm';
import { Grid } from 'semantic-ui-react';
import { useState } from 'react';
import { setFormInput } from '../../shared/formHelpers';
import { useLoginMutation, useRegisterMutation } from '../../redux/user/userApiSlice';
import { useValidateForm } from './useValidateForm';
import { useFormErrorInfo } from './useFormErrorInfo';
import { ReactInput } from '../../types/generalTypes';

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
	const [login, loginData] = useLoginMutation();
	const [register, registerData] = useRegisterMutation();
	const { formError, invalidForm, validateFormData } = useValidateForm();

	const loginStatus = { isError: loginData.isError, error: loginData.error };
	const registerStatus = {
		isError: registerData.isError,
		error: registerData.error,
	};

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
			formIsValid && register({ name, username, email, password });
		} else {
			if (email && password) login({ email, password });
			else {
				invalidForm('Please provide your email and password.');
			}
		}
	};

	const error = useFormErrorInfo(formError, [registerStatus, loginStatus]);

	const { isLoading: isLoadingLogin } = loginData;
	const { isLoading: isLoadingRegister } = registerData;

	return (
		<Grid textAlign="center" style={{ height: '100vh' }} verticalAlign="middle">
			<LogInForm
				isRegisterForm={props.isRegisterForm}
				isLoading={isLoadingLogin || isLoadingRegister}
				formError={error}
				onFormChange={handleFormChange}
				onSubmit={handleFormSubmit}
			/>
		</Grid>
	);
};

export default Authentication;
