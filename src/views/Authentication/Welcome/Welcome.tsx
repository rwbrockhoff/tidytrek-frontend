import { type InputEvent } from '../../../types/formTypes';
import { AuthContainer } from '../../../components/Authentication/FormComponents';
import WelcomeForm from '../../../components/Authentication/WelcomeForm/WelcomeForm';
import { setFormInput } from '../../../utils/formHelpers';
import { useEffect, useState } from 'react';
import { useUpdateUsernameMutation } from '../../../queries/profileSettingsQueries';
import { useNavigate } from 'react-router-dom';
import supabase from '../../../api/supabaseClient';
import { useGetAuthStatusQuery, useLoginMutation } from '../../../queries/userQueries';
import { useAxiosErrorMessage, isAxiosError } from '../../../shared/hooks/useAxiosError';

const Welcome = () => {
	const navigate = useNavigate();
	const { data } = useGetAuthStatusQuery();

	const { mutate: login } = useLoginMutation();
	const { mutateAsync: saveUsername, isPending } = useUpdateUsernameMutation();

	const [formData, setFormData] = useState(initialFormState);
	const [formError, setFormError] = useState(initialErrorState);

	useEffect(() => {
		// subscribe to session change and log in user
		if (data?.isAuthenticated === false) {
			supabase.auth.getUser().then(({ data: { user } }) => {
				const { id, email } = user || {};
				if (id && email) login({ email, userId: id });
			});
		}
	}, []);

	const handleFormChange = (e: InputEvent) => {
		if (formError.error) setFormError(initialErrorState);
		setFormInput(e, setFormData);
	};

	const handleFormError = (message: string) => {
		setFormError({ error: true, message });
	};

	const handleSaveUsername = async () => {
		const { username, trailName } = formData;
		if (!username && !trailName) navigate('/');
		try {
			await saveUsername(formData);
			setFormData(initialFormState);
			navigate('/');
		} catch (error) {
			if (isAxiosError(error)) {
				const errorMessage = useAxiosErrorMessage(error);
				handleFormError(errorMessage);
			}
		}
	};

	const { username, trailName } = formData;
	return (
		<AuthContainer>
			<WelcomeForm
				username={username}
				trailName={trailName}
				isPending={isPending}
				formError={formError}
				onChange={handleFormChange}
				saveUsername={handleSaveUsername}
			/>
		</AuthContainer>
	);
};

export default Welcome;

// Defaults //
const initialFormState = { username: '', trailName: '' };
const initialErrorState = { error: false, message: '' };
