import { useContext } from 'react';
import {
	UserPermissionsContext,
	type UserPermissionsContextValue,
} from '@/contexts/user-permissions-context';

export const usePermissions = (): UserPermissionsContextValue => {
	const context = useContext(UserPermissionsContext);

	if (context === null) {
		throw new Error('usePermissions must be used within a UserPermissionsProvider');
	}

	return context;
};
