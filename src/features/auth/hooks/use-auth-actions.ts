import { useNavigate } from 'react-router-dom';
import { useOAuthLoginMutation, useOAuthRegisterMutation } from '@/queries/user-queries';
import { type LoginUser, type RegisterUser } from '@/types/user-types';

// Hook to manage auth state changes and navigation

export const useAuthActions = () => {
	const navigate = useNavigate();

	const { mutateAsync: loginUser } = useOAuthLoginMutation();
	const { mutateAsync: registerUser } = useOAuthRegisterMutation();

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
