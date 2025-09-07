import { createContext } from 'react';
import { useGetAuthStatusQuery } from '@/queries/user-queries';
import { type Settings } from '@/types/settings-types';
import { type User } from '@/types/user-types';

export type AuthContextValue = {
	isLoading: boolean;
	isAuthenticated: boolean;
	subscriptionStatus: boolean;
	user: User | null;
	settings: Settings | null;
};

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const { isLoading, data } = useGetAuthStatusQuery();

	const user = data?.user || null;
	const settings = data?.settings || null;
	const isAuthenticated = data?.isAuthenticated || false;
	const subscriptionStatus = data?.subscriptionStatus || false;

	const value = {
		isLoading,
		isAuthenticated,
		subscriptionStatus,
		user,
		settings,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
