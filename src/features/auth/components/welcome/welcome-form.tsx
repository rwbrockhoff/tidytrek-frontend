import { type WelcomeFormData } from '../../types/auth-types';
import { type InputEvent } from '@/types/form-types';
import { type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Flex, Text, Heading, Button, TextField } from '@radix-ui/themes';
import { Link, Segment, Message } from '@/components/ui';
import { FormContainer } from '../form-components';
import { Form, FormField, FormControl, FormMessage } from '@radix-ui/react-form';
import { z, usernameSchema, trailNameSchema } from '@/schemas';
import { useUpdateUsernameMutation } from '@/queries/profile-settings-queries';
import { useMutationErrors, useZodError } from '@/hooks';

const formSchema = z.object({
	username: usernameSchema,
	trailName: trailNameSchema,
});

export const WelcomeForm = () => {
	const navigate = useNavigate();
	const { mutateAsync: saveUsername, isPending } = useUpdateUsernameMutation();

	const { serverError, updateAxiosError, resetAxiosError } = useMutationErrors();
	const { formErrors, updateFormErrors, resetFormErrors } = useZodError([
		'username',
		'trailName',
	]);

	const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		// validate form data
		const formData = Object.fromEntries(new FormData(e.currentTarget)) as WelcomeFormData;
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
		if (formErrors[e.target.name].error) resetFormErrors(e.target.name);
		if (serverError.error) resetAxiosError();
	};

	return (
		<FormContainer>
			<Heading as="h1" mb="4">
				tidytrek
			</Heading>

			<Segment $radius="2">
				<Heading as="h3" size="6" color="jade" mb="4">
					Welcome to Tidytrek!
				</Heading>
				<Text size="4" mb="4">
					Go by a different name on the trail?
				</Text>
				<br />
				<Text color="gray" size="3">
					A <strong>username</strong> has to be unique and helps people find your profile.{' '}
					<br /> A <strong>trail name</strong> can be anything you'd like.
				</Text>
				<Form onSubmit={handleFormSubmit}>
					<FormField name="username">
						<FormControl asChild>
							<TextField.Input
								data-invalid={formErrors.username.error}
								onChange={handleClearErrors}
								radius="small"
								my="4"
								size="3"
								placeholder="Username (optional)"
							/>
						</FormControl>
						{formErrors.username.error && (
							<FormMessage>
								<Text mb="8" color="tomato" weight="light">
									{formErrors.username.message}
								</Text>
							</FormMessage>
						)}
					</FormField>
					<FormField name="trailName">
						<FormControl asChild>
							<TextField.Input
								data-invalid={formErrors.trailName.error}
								onChange={handleClearErrors}
								radius="small"
								my="4"
								size="3"
								placeholder="Trail Name (optional)"
							/>
						</FormControl>
						{formErrors.trailName.error && (
							<FormMessage>
								<Text mb="8" color="tomato" weight="light">
									{formErrors.trailName.message}
								</Text>
							</FormMessage>
						)}
					</FormField>
					{serverError.error && (
						<Message messageType="error" text={serverError.message} />
					)}
					<Button
						type="submit"
						disabled={isPending}
						size="3"
						mt="4"
						style={{ width: '100%', cursor: 'pointer' }}>
						Submit
					</Button>
				</Form>

				<Flex justify="center" mt="4">
					<Link link={'/'}>
						<Text size="3">Skip For Now</Text>
					</Link>
				</Flex>
			</Segment>
		</FormContainer>
	);
};
