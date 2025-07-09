import { useState } from 'react';
import { type FormSection, FORM_SECTIONS } from '@/features/account/types';
import { Heading } from '@radix-ui/themes';
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
		changeFormSection(FORM_SECTIONS.PASSWORD);
		reauthenticate.mutate(undefined, {
			onSuccess: () => {
				setConfirmationSent(true);
			},
		});
	};

	const handleFormSuccess = () => {
		setFormSuccess(true);
	};

	const handleCloseForm = () => {
		changeFormSection(FORM_SECTIONS.INITIAL);
		setFormSuccess(false);
		setConfirmationSent(false);
		reauthenticate.reset();
	};

	const showConfirmationForm =
		(!formSuccess && displayFormSection === FORM_SECTIONS.CONFIRMATION) ||
		(displayFormSection === FORM_SECTIONS.PASSWORD && confirmationSent && !formSuccess);

	const sectionComponents = {
		[FORM_SECTIONS.INITIAL]: () => (
			<PasswordChangeButton onChangeSection={changeFormSection} />
		),
		[FORM_SECTIONS.CONFIRMATION]: () => 
			showConfirmationForm ? (
				<ConfirmationForm
					sendConfirmation={handleSendConfirmation}
					confirmationSent={confirmationSent}
					isError={reauthenticate.isError}
					errorMessage={confirmationErrorMessage}
				/>
			) : null,
		[FORM_SECTIONS.PASSWORD]: () => 
			showConfirmationForm ? (
				<ConfirmationForm
					sendConfirmation={handleSendConfirmation}
					confirmationSent={confirmationSent}
					isError={reauthenticate.isError}
					errorMessage={confirmationErrorMessage}
				/>
			) : (
				<PasswordChangeForm
					onFormSuccess={handleFormSuccess}
					onCancel={handleCloseForm}
					isFormSuccess={formSuccess}
				/>
			),
	};

	const CurrentSection = sectionComponents[displayFormSection];

	return (
		<>
			<Heading as="h4" size="3" mb="4">
				Update Your Password
			</Heading>
			{CurrentSection && <CurrentSection />}
		</>
	);
};
