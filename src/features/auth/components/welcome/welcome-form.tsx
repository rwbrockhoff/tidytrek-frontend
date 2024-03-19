import { type WelcomeFormData, type FormErrors } from '../../types/auth-types';
import { type FormEvent } from 'react';
import { Flex, Text, Heading, Button, TextField } from '@radix-ui/themes';
import { Link, Segment, Message } from '@/components/ui';
import { FormContainer } from '../form-components';
import { Form, FormField, FormControl, FormMessage } from '@radix-ui/react-form';
import { FormError, InputEvent } from '@/types/form-types';

type WelcomeFormProps = {
	formErrors: FormErrors;
	serverError: FormError;
	resetFormErrors: (inputName?: string) => void;
	isPending: boolean;
	saveUsername: (formData: WelcomeFormData) => void;
};

export const WelcomeForm = (props: WelcomeFormProps) => {
	const { resetFormErrors, formErrors, serverError, isPending, saveUsername } = props;

	const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const data = Object.fromEntries(new FormData(e.currentTarget)) as WelcomeFormData;
		saveUsername(data);
	};

	const handleClearErrors = (e: InputEvent) => {
		if (formErrors[e.target.name].error) resetFormErrors(e.target.name);
		if (serverError.error) resetFormErrors();
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
