import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { type InputEvent } from '@/types/form-types';
import { useUpdateUsernameMutation, useGenerateUsernameQuery } from '@/queries/profile-settings-queries';
import { useMutationErrors } from '@/hooks/form/use-axios-error';
import { useZodError, clearZodErrors } from '@/hooks/form/use-zod-error';
import { setFormInput } from '@/utils';
import { z, usernameSchema, trailNameSchema } from '@/schemas';

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

	const { serverError, updateAxiosError, resetAxiosError } = useMutationErrors();
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
		if (serverError.error) resetAxiosError();
	};

	const handleGenerateUsername = async () => {
		const result = await generateUsername();
		if (result.data?.username) {
			setFormData((prev) => ({ ...prev, username: result.data.username }));
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
		if (!username && !trailName) navigate('/');
		
		try {
			await saveUsername(formData);
			navigate('/');
		} catch (error: any) {
			// catch + display errors (already taken username)
			updateAxiosError(error);
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