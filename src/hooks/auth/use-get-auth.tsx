import { useGetAuthStatusQuery } from '@/queries/user-queries';
import { type Settings } from '@/types/settings-types';
import { type User } from '@/types/user-types';

type UseGetAuthReturn = {
	isLoading: boolean;
	isAuthenticated: boolean;
	user: User | null;
	settings: Settings | null;
};

export const useGetAuth = (): UseGetAuthReturn => {
	const { isLoading, data } = useGetAuthStatusQuery();

	const user = data?.user || null;
	const settings = data?.settings || null;
	const isAuthenticated = data?.isAuthenticated || false;

	return { isLoading, isAuthenticated, user, settings };
};
