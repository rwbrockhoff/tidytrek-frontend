import { useContext } from 'react';
import {
	UserPermissionsContext,
	type UserPermissionsContextValue,
} from '@/contexts/user-permissions-context';
import { useUserPermissions } from './use-user-permissions';

export const useUserPermissionsContext = (): UserPermissionsContextValue => {
	const context = useContext(UserPermissionsContext);
	const fallbackPermissions = useUserPermissions();

	if (context === null) return fallbackPermissions;

	return context;
};
