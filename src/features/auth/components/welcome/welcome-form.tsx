import { type InputEvent } from '@/types/form-types';
import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Flex, Text, Heading, Button, IconButton } from '@radix-ui/themes';
import { Link, Segment, FormField, Tooltip, RefreshIcon } from '@/components/ui';
import { FormContainer } from '../form-components';
import { Form } from '@radix-ui/react-form';
import { z, usernameSchema, trailNameSchema } from '@/schemas';
import { useUpdateUsernameMutation } from '@/queries/profile-settings-queries';
import { clearZodErrors, useMutationErrors, useZodError } from '@/hooks';
import { setFormInput, usernameInfo, trailNameInfo } from '@/utils';
import { useQueryClient } from '@tanstack/react-query';
import { profileSettingsKeys } from '@/queries/query-keys';
import { tidyTrekAPI } from '@/api/tidytrekAPI';

const formSchema = z.object({
	username: usernameSchema,
	trailName: trailNameSchema,
});

type ZodInputs = {
	username: string;
	trailName: string;
};

type WelcomeFormProps = {
	defaultUsername: string | undefined;
};

export const WelcomeForm = ({ defaultUsername }: WelcomeFormProps) => {
	const [formData, setFormData] = useState<ZodInputs>({
		username: defaultUsername || '',
		trailName: '',
	});

	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const { mutateAsync: saveUsername, isPending } = useUpdateUsernameMutation();

	const { serverError, updateAxiosError, resetAxiosError } = useMutationErrors();
	const { formErrors, updateFormErrors, resetFormErrors } = useZodError<ZodInputs>([
		'username',
		'trailName',
	]);

	const handleInput = (e: InputEvent) => {
		setFormInput(e, setFormData);
		handleClearErrors(e);
	};

	const handleGenerateUsername = async () => {
		const { username } = await generateUsername();
		setFormData((prev) => ({ ...prev, username }));
	};

	const generateUsername = async () => {
		return await queryClient.fetchQuery({
			queryKey: profileSettingsKeys.username,
			queryFn: () =>
				tidyTrekAPI.get('/profile-settings/random-username').then((res) => res.data),
		});
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
		} catch (error) {
			// catch + display errors (already taken username)
			updateAxiosError(error);
		}
	};

	const handleClearErrors = (e: InputEvent) => {
		clearZodErrors<ZodInputs>(e, formErrors, resetFormErrors);
		if (serverError.error) resetAxiosError();
	};

	const { username, trailName } = formData;

	return (
		<FormContainer>
			<Heading as="h1" mb="4">
				tidytrek
			</Heading>

			<Segment $radius="2">
				<Heading as="h3" size="6" color="jade" mb="4">
					Welcome to Tidytrek!
				</Heading>

				<Form onSubmit={handleFormSubmit}>
					<FormField
						name="username"
						label="Username"
						value={username}
						onChange={handleInput}
						placeholder="Username"
						error={formErrors.username}
						tooltip={<Tooltip content={usernameInfo} />}
						icon={
							<IconButton
								radius="medium"
								size="1"
								type="button"
								onClick={handleGenerateUsername}>
								<RefreshIcon />
							</IconButton>
						}
					/>

					<FormField
						name="trailName"
						value={trailName}
						placeholder="Trail Name"
						onChange={handleInput}
						label="Trail Name"
						error={formErrors.trailName}
						tooltip={<Tooltip content={trailNameInfo} />}
					/>

					<Button
						type="submit"
						disabled={isPending}
						size="3"
						mt="4"
						style={{ width: '100%', cursor: 'pointer' }}>
						Save
					</Button>
				</Form>

				<Flex justify="center" mt="4">
					<Link link={'/'}>
						<Text size="3">Keep default username</Text>
					</Link>
				</Flex>
			</Segment>
		</FormContainer>
	);
};
