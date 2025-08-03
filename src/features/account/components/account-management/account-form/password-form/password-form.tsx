import { useState } from 'react';
import { FormSection } from '@/features/account/types';
import { Heading, Text, Callout } from '@radix-ui/themes';
import { Segment } from '@/components/primitives';
import { Stack, Flex } from '@/components/layout';
import { CheckIcon } from '@/components/icons';
import { PasswordChangeButton } from './password-change-button';
import { PasswordChangeForm } from './password-change-form';
import { ConfirmationForm } from '../confirmation-form/confirmation-form';
import { usePasswordActions } from '@/features/account/hooks';

type PasswordFormProps = {
	displayFormSection: FormSection;
	changeFormSection: (section: FormSection) => void;
};

const confirmationErrorMessage =
	'There was an error sending a confirmation code. Please try again later.';

export const PasswordForm = ({
	displayFormSection,
	changeFormSection,
}: PasswordFormProps) => {
	const [confirmationSent, setConfirmationSent] = useState(false);
	const [formSuccess, setFormSuccess] = useState(false);
	const { reauthenticate } = usePasswordActions();

	const handleSendConfirmation = () => {
		reauthenticate.mutate(undefined, {
			onSuccess: () => {
				setConfirmationSent(true);
				changeFormSection(FormSection.PASSWORD);
			},
		});
	};

	const handleFormSuccess = () => {
		setFormSuccess(true);
	};

	const handleCloseForm = () => {
		changeFormSection(FormSection.INITIAL);
		setFormSuccess(false);
		setConfirmationSent(false);
		reauthenticate.reset();
	};

	const sectionComponents = {
		[FormSection.INITIAL]: () => (
			<PasswordChangeButton onChangeSection={changeFormSection} />
		),
		[FormSection.CONFIRMATION]: () => (
			<ConfirmationForm
				sendConfirmation={handleSendConfirmation}
				isError={reauthenticate.isError}
				errorMessage={confirmationErrorMessage}
			/>
		),
		[FormSection.PASSWORD]: () => (
			<Stack className="gap-4">
				{confirmationSent && (
					<Callout.Root color="grass" variant="surface" className="max-w-sm">
						<Flex className="items-center gap-2">
							<CheckIcon />
							<Heading size="4">Email Sent!</Heading>
						</Flex>
						<Text>Check your email for your code to use below.</Text>
					</Callout.Root>
				)}
				<PasswordChangeForm
					onFormSuccess={handleFormSuccess}
					onCancel={handleCloseForm}
					isFormSuccess={formSuccess}
				/>
			</Stack>
		),
	};

	const CurrentSection = sectionComponents[displayFormSection];

	return (
		<Segment>
			<Heading as="h4" size="3" mb="4">
				Update Your Password
			</Heading>
			{CurrentSection && <CurrentSection />}
		</Segment>
	);
};
