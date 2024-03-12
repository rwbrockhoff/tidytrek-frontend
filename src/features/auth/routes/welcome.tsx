import { type InputEvent } from '@/types/form-types';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { AuthContainer } from '../components/form-components';
import { WelcomeForm } from '../components/welcome/welcome-form';
import { setFormInput } from '@/utils';
import { useUpdateUsernameMutation } from '@/queries/profile-settings-queries';
import supabase from '@/api/supabaseClient';
import { useGetAuthStatusQuery, useLoginMutation } from '@/queries/user-queries';
import { useMutationError } from '@/hooks/use-axios-error';

export const Welcome = () => {
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
			useMutationError(error, handleFormError);
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

// Defaults //
const initialFormState = { username: '', trailName: '' };
const initialErrorState = { error: false, message: '' };
