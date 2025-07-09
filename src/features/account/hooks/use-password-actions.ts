import { useMutation } from '@tanstack/react-query';
import { reauthenticateUser, updatePassword } from '@/api/supabaseClient';

export const usePasswordActions = () => {
	const reauthenticate = useMutation({
		mutationFn: async () => {
			const { error } = await reauthenticateUser();
			if (error) throw error;
			return true;
		},
	});

	const changePassword = useMutation({
		mutationFn: async ({ password, emailCode }: { password: string; emailCode: string }) => {
			const { error } = await updatePassword(password, emailCode);
			if (error) throw error;
			return true;
		},
	});

	return {
		reauthenticate,
		changePassword,
	};
};