import { useGetAuthStatusQuery } from '@/queries/user-queries';

export const useGetAuth = () => {
	const { isLoading, data } = useGetAuthStatusQuery();

	const user = data?.user || null;
	const isAuthenticated = data?.isAuthenticated || false;

	return { isLoading, isAuthenticated, user };
};
