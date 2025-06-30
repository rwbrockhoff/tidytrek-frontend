import { useGetAuthStatusQuery } from '@/queries/user-queries';
import { type User } from '@/types/user-types';

type UseGetAuthReturn = {
	isLoading: boolean;
	isAuthenticated: boolean;
	user: User | null;
};

export const useGetAuth = (): UseGetAuthReturn => {
	const { isLoading, data } = useGetAuthStatusQuery();

	const user = data?.user || null;
	const isAuthenticated = data?.isAuthenticated || false;

	return { isLoading, isAuthenticated, user };
};
