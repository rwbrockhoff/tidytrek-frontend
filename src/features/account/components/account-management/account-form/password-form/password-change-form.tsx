import { type FormEvent } from 'react';
import { Flex, Stack } from '@/components/layout';
import { Button } from '@/components/alpine';
import { Form } from '@radix-ui/react-form';
import { Alert } from '@/components/ui';
import { usePasswordChangeForm } from '@/features/account/hooks/use-password-change-form';
import { usePasswordChangeMutation } from '@/features/account/hooks/use-password-change-mutation';
import { PasswordChangeFormFields } from './password-change-form-fields';

type PasswordChangeFormProps = {
	onFormSuccess: () => void;
	onCancel: () => void;
	isFormSuccess: boolean;
};

const supabaseErrorMessage =
	'There was an error updating your password. You might need to try again.';

const successMessage = 'Your password was changed successfully.';

export const PasswordChangeForm = ({
	onFormSuccess,
	onCancel,
	isFormSuccess,
}: PasswordChangeFormProps) => {
	const { formRef, formErrors, validateForm, handleClearErrors, resetForm } =
		usePasswordChangeForm();

	const { handleSubmit, isError, isPending } = usePasswordChangeMutation({
		onSuccess: onFormSuccess,
		resetForm,
	});

	const handleSubmitForm = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const validation = validateForm(formData);

		if (validation.isValid && validation.data) {
			handleSubmit(validation.data);
		}
	};

	return (
		<Form className="max-w-sm" ref={formRef} onSubmit={handleSubmitForm}>
			<Stack className="gap-4">
				<PasswordChangeFormFields
					formErrors={formErrors}
					onClearErrors={handleClearErrors}
				/>

				{isError && <Alert variant="error" className="my-2">{supabaseErrorMessage}</Alert>}

				{isFormSuccess && <Alert variant="success" className="mb-2">{successMessage}</Alert>}

				<Flex className="justify-end gap-2">
					<Button
						variant="outline"
						color="secondary"
						className="outline-button-dark"
						onClick={onCancel}>
						{isFormSuccess ? 'Close' : 'Cancel'}
					</Button>
					<Button type="submit" loading={isPending}>
						Save Password
					</Button>
				</Flex>
			</Stack>
		</Form>
	);
};
