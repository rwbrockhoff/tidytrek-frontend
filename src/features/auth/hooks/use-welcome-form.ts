import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { type InputEvent } from '@/types/form-types';
import {
	useUpdateUsernameMutation,
	useGenerateUsernameQuery,
} from '@/queries/profile-settings-queries';
import { extractErrorMessage } from '@/utils/error-utils';
import { useZodError, clearZodErrors } from '@/hooks/form/use-zod-error';
import { setFormInput } from '@/utils';
import { z } from 'zod';
import { usernameSchema } from '@/schemas/auth-schemas';
import { trailNameSchema } from '@/schemas/user-schemas';

const formSchema = z.object({
	username: usernameSchema,
	trailName: trailNameSchema,
});

type ZodInputs = {
	username: string;
	trailName: string;
};

type UseWelcomeFormProps = {
	defaultUsername: string | undefined;
};

export const useWelcomeForm = ({ defaultUsername }: UseWelcomeFormProps) => {
	const [formData, setFormData] = useState<ZodInputs>({
		username: defaultUsername || '',
		trailName: '',
	});

	const navigate = useNavigate();
	const { mutateAsync: saveUsername, isPending } = useUpdateUsernameMutation();
	const { refetch: generateUsername } = useGenerateUsernameQuery();

	const [serverError, setServerError] = useState({ error: false, message: '' });
	const { formErrors, updateFormErrors, resetFormErrors } = useZodError<ZodInputs>([
		'username',
		'trailName',
	]);

	const handleInput = (e: InputEvent) => {
		setFormInput(e, setFormData);
		handleClearErrors(e);
	};

	const handleClearErrors = (e: InputEvent) => {
		clearZodErrors<ZodInputs>(e, formErrors, resetFormErrors);
		if (serverError.error) setServerError({ error: false, message: '' });
	};

	const handleGenerateUsername = async () => {
		const result = await generateUsername();
		
		if (result.data?.username) {
			setFormData((prev) => ({ ...prev, username: result.data.username }));
			return;
		}
		
		if (result.error) {
			const message = extractErrorMessage(result.error);
			setServerError({ error: true, message });
		}
	};

	const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		// validate form data
		const data = formSchema.safeParse(formData);
		if (!data.success) {
			const result = JSON.parse(data.error.message);
			return updateFormErrors(result);
		}
		// allow empty input and navigate to dashboard
		const { username, trailName } = formData;

		if (!username && !trailName) return navigate('/');

		try {
			await saveUsername(formData);
			navigate('/');
		} catch (error: unknown) {
			const message = extractErrorMessage(error);
			setServerError({ error: true, message });
		}
	};

	return {
		formData,
		isPending,
		serverError,
		formErrors,
		handleInput,
		handleGenerateUsername,
		handleFormSubmit,
	};
};
