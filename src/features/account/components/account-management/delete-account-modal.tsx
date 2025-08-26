import { Dialog } from '@radix-ui/themes';
import { Flex, Stack } from '@/components/layout';
import { Button, TextField } from '@/components/alpine';
import { Alert } from '@/components/ui';
import { TrashIcon, UserIcon } from '@/components/icons';
import { useState } from 'react';
import { useFieldState } from '@/hooks/form/use-field-state';
import { useDeleteAccountMutation } from '@/queries/user-queries';
import { useNavigate } from 'react-router-dom';

type DeleteAccountModalProps = {
	children: React.ReactNode;
};

const deleteMessage =
	"This action cannot be undone. Make sure to save any pack information before you proceed. We're sorry to see ya go!";

const validateConfirmation = (value: string) => {
	return value.toLowerCase() === 'delete';
};

export const DeleteAccountModal = ({ children }: DeleteAccountModalProps) => {
	const navigate = useNavigate();
	const [isOpen, setIsOpen] = useState(false);
	const { mutate: deleteAccount, isPending, reset } = useDeleteAccountMutation();

	const {
		value: confirmText,
		apiError,
		handleChange,
		setApiErrorFromResponse,
		setValue,
		clearErrors,
	} = useFieldState({
		initialValue: '',
		validator: validateConfirmation,
		resetOnSuccess: reset,
	});

	const isDeleteEnabled = confirmText.toLowerCase() === 'delete';

	const handleDelete = () => {
		if (!isDeleteEnabled) return;

		deleteAccount(undefined, {
			onSuccess: () => {
				setIsOpen(false);
				navigate('/login', { replace: true, viewTransition: true });
			},
			onError: (error) => {
				setApiErrorFromResponse(error);
			},
		});
	};

	const handleOpenChange = (open: boolean) => {
		setIsOpen(open);
		if (!open) {
			setValue('');
			clearErrors();
			reset();
		}
	};

	return (
		<Dialog.Root open={isOpen} onOpenChange={handleOpenChange}>
			<Dialog.Trigger>{children}</Dialog.Trigger>
			<Dialog.Content style={{ maxWidth: 450 }}>
				<Dialog.Title>
					<Flex className="items-center gap-2">
						<UserIcon />
						Delete Your Account
					</Flex>
				</Dialog.Title>
				<Dialog.Description>{deleteMessage}</Dialog.Description>

				<Stack className="gap-3 my-4">
					<TextField.Standalone
						placeholder="Type 'delete' to confirm"
						value={confirmText}
						onChange={handleChange}
						aria-label="Confirmation text"
						disabled={isPending}
					/>

					{apiError && (
						<Alert variant="error">
							{apiError.message ||
								'There was an error deleting your account. Please try again.'}
						</Alert>
					)}
				</Stack>

				<Flex className="gap-3 justify-end">
					<Dialog.Close>
						<Button variant="outline" disabled={isPending}>
							Cancel
						</Button>
					</Dialog.Close>

					<Button
						color="danger"
						onClick={handleDelete}
						iconLeft={<TrashIcon />}
						disabled={!isDeleteEnabled || isPending}
						loading={isPending}>
						Delete Account
					</Button>
				</Flex>
			</Dialog.Content>
		</Dialog.Root>
	);
};
