import { type WelcomeFormData } from '../types/auth-types';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { AuthContainer } from '../components/form-components';
import { WelcomeForm } from '../components/welcome/welcome-form';
import { useUpdateUsernameMutation } from '@/queries/profile-settings-queries';
import supabase from '@/api/supabaseClient';
import { useLoginMutation } from '@/queries/user-queries';
import { useMutationErrors } from '@/hooks/use-axios-error';
import { useGetAuth, useZodError } from '@/hooks';
import { z, usernameSchema, trailNameSchema } from '@/schemas';

const formSchema = z.object({
	username: usernameSchema,
	trailName: trailNameSchema,
});

export const Welcome = () => {
	const navigate = useNavigate();
	const { isAuthenticated } = useGetAuth();

	const { mutate: login } = useLoginMutation();
	const { mutateAsync: saveUsername, isPending } = useUpdateUsernameMutation();

	const { formErrors, updateFormErrors, resetFormErrors } = useZodError([
		'username',
		'trailName',
	]);

	const { serverError, updateAxiosError, resetAxiosError } = useMutationErrors();

	useEffect(() => {
		// subscribe to session change and log in user
		if (isAuthenticated === false) {
			supabase.auth.getUser().then(({ data: { user } }) => {
				const { id, email } = user || {};
				if (id && email) login({ email, userId: id });
			});
		}
	}, []);

	const handleClearErrors = (inputName?: string) => {
		if (inputName) resetFormErrors(inputName);
		if (serverError.error) resetAxiosError();
	};

	const handleSaveUsername = async (formData: WelcomeFormData) => {
		const data = formSchema.safeParse(formData);
		if (!data.success) {
			const result = JSON.parse(data.error.message);
			return updateFormErrors(result);
		}
		const { username, trailName } = formData;
		if (!username && !trailName) navigate('/');
		try {
			await saveUsername(formData);
			navigate('/');
		} catch (error) {
			updateAxiosError(error);
		}
	};

	return (
		<AuthContainer>
			<WelcomeForm
				isPending={isPending}
				formErrors={formErrors}
				serverError={serverError}
				resetFormErrors={handleClearErrors}
				saveUsername={handleSaveUsername}
			/>
		</AuthContainer>
	);
};
