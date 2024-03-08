import { type InputEvent } from '../../../types/formTypes';
import { AuthContainer } from '../../../components/Authentication/FormComponents';
import WelcomeForm from '../../../components/Authentication/WelcomeForm/WelcomeForm';
import { setFormInput } from '../../../utils/formHelpers';
import { useEffect, useState } from 'react';
import { useUpdateUsernameMutation } from '../../../queries/profileSettingsQueries';
import { useNavigate } from 'react-router-dom';
import supabase from '../../../api/supabaseClient';
import { useGetAuthStatusQuery, useLoginMutation } from '../../../queries/userQueries';

const Welcome = () => {
	const navigate = useNavigate();
	const { data } = useGetAuthStatusQuery();

	const { mutate: login } = useLoginMutation();
	const { mutate: saveUsername, isPending } = useUpdateUsernameMutation();

	const [formData, setFormData] = useState(initialFormState);
	const [formError, setFormError] = useState(initialErrorState);

	useEffect(() => {
		// subscribe to session change and log in user
		if (data?.isAuthenticated === false) {
			supabase.auth.getSession().then(({ data: { session } }) => {
				if (session) {
					const { email, id } = session?.user || {};
					id && email && login({ email, userId: id });
				}
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

	const handleSaveUsername = () => {
		const { username, trailName } = formData;
		if (!username && !trailName) return handleFormError(errorMessage);
		else {
			saveUsername(formData);
			setFormData(initialFormState);
			navigate('/');
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
const errorMessage = 'Please type in a username or trail name.';
const initialFormState = { username: '', trailName: '' };
const initialErrorState = { error: false, message: '' };
