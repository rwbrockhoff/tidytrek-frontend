import { createContext, type ReactNode } from 'react';
import { type UserPermissionLevel } from '@/hooks/auth/use-user-permissions';
import { type User } from '@/types/user-types';

export type UserPermissionsContextValue = {
	permissionLevel: UserPermissionLevel;
	isGuest: boolean;
	isAuthenticated: boolean;
	isCreator: boolean;
	user: User | null;
	isLoading: boolean;
	isPreviewMode: boolean;
};

export const UserPermissionsContext = createContext<UserPermissionsContextValue | null>(null);

type UserPermissionsProviderProps = {
	children: ReactNode;
	value: UserPermissionsContextValue;
};

export const UserPermissionsProvider = ({ children, value }: UserPermissionsProviderProps) => {
	return (
		<UserPermissionsContext.Provider value={value}>
			{children}
		</UserPermissionsContext.Provider>
	);
};

