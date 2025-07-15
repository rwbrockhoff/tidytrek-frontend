import { type FormEvent } from 'react';
import mx from '@/styles/utils/mixins.module.css';
import { Flex } from '@/components/layout';
import { Button } from '@/components/alpine';
import { Form } from '@radix-ui/react-form';
import { Message } from '@/components/ui';
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
		<Form className={mx.halfWidth} ref={formRef} onSubmit={handleSubmitForm}>
			<PasswordChangeFormFields
				formErrors={formErrors}
				onClearErrors={handleClearErrors}
			/>

			{isError && <Message messageType="error" text={supabaseErrorMessage} />}

			{isFormSuccess && <Message messageType="success" text={successMessage} />}

			<Flex className="justify-end gap-3 w-full mt-6 md:w-auto md:mt-0">
				<Button variant="outline" onClick={onCancel}>
					{isFormSuccess ? 'Close' : 'Cancel'}
				</Button>
				<Button type="submit" loading={isPending}>
					Save Password
				</Button>
			</Flex>
		</Form>
	);
};
