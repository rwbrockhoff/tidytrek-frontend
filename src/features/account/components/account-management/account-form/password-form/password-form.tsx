import { useState } from 'react';
import { FormSection } from '@/features/account/types';
import { Heading } from '@radix-ui/themes';
import { Segment } from '@/components/primitives';
import { Stack } from '@/components/layout';
import { Alert } from '@/components/ui';
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
				isPending={reauthenticate.isPending}
			/>
		),
		[FormSection.PASSWORD]: () => (
			<Stack className="gap-4">
				{confirmationSent && !formSuccess && (
					<Alert variant="success">
						Email sent! Check your inbox for the code.
					</Alert>
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
