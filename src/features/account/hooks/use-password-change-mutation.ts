import { type PasswordInfo } from '@/types/form-types';
import { usePasswordActions } from '@/features/account/hooks';

type UsePasswordChangeMutationProps = {
	onSuccess: () => void;
	resetForm: () => void;
};

export const usePasswordChangeMutation = ({
	onSuccess,
	resetForm,
}: UsePasswordChangeMutationProps) => {
	const { changePassword } = usePasswordActions();

	const handleSubmit = (data: PasswordInfo) => {
		const { password, emailCode } = data;
		changePassword.mutate(
			{ password, emailCode },
			{
				// successfully changed password
				onSuccess: () => {
					resetForm();
					onSuccess();
				},
			},
		);
	};

	return {
		handleSubmit,
		isError: changePassword.isError,
		isPending: changePassword.isPending,
	};
};
