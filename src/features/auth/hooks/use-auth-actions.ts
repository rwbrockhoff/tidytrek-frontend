import { useNavigate } from 'react-router-dom';
import { useLoginMutation, useRegisterMutation } from '@/queries/user-queries';
import { type LoginUser, type RegisterUser } from '@/types/user-types';

// Hook to manage auth state changes and navigation

export const useAuthActions = () => {
	const navigate = useNavigate();

	const { mutateAsync: loginUser } = useLoginMutation();
	const { mutateAsync: registerUser } = useRegisterMutation();

	const login = async (userData: LoginUser) => {
		await loginUser(userData);
		navigate('/');
	};

	const register = async (userData: RegisterUser) => {
		await registerUser(userData);
		navigate('/welcome');
	};

	const loginWithoutNavigation = async (userData: LoginUser) => {
		await loginUser(userData);
	};

	return {
		login,
		register,
		loginWithoutNavigation,
	};
};
