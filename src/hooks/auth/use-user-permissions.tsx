import { useParams } from 'react-router-dom';
import { useAuth } from './use-auth';
import { useGetPackQuery } from '@/queries/pack-queries';
import { useGuestRoute } from '@/hooks/routing/use-route-context';
import { decode } from '@/utils';
import { type User } from '@/types/user-types';

export type UserPermissionLevel = 'guest' | 'authenticated' | 'creator';

type UseUserPermissionsOptions = {
	packId?: number | string | null;
	pack?: { userId: string };
};

type UseUserPermissionsReturn = {
	permissionLevel: UserPermissionLevel;
	isGuest: boolean;
	isAuthenticated: boolean;
	isCreator: boolean;
	user: User | null;
	isLoading: boolean;
};

/**
 * Determines user permission level for current route/resource.
 * Handles pack ownership, profile access, and guest/auth states.
 *
 * @param options - Optional pack data to avoid extra query fetches
 * @returns Permission level, user data, and loading state
 */

export const useUserPermissions = (
	options: UseUserPermissionsOptions = {},
): UseUserPermissionsReturn => {
	const { user, isAuthenticated, isLoading: authLoading } = useAuth();
	const { packId: paramPackId, userId: paramUserId } = useParams();
	const isGuestRoute = useGuestRoute();

	// use packId or grab from URL - only decode for user routes
	const targetPackId =
		options.packId ?? (paramPackId && !isGuestRoute ? decode(paramPackId) : null);

	// skip request if pack provided
	const { data: fetchedPack, isLoading: packLoading } = useGetPackQuery(
		options.pack ? null : typeof targetPackId === 'number' ? targetPackId : null,
	);

	const pack = options.pack || fetchedPack?.pack;
	const packCreatorId = pack?.userId || null;

	// determine permission level
	let permissionLevel: UserPermissionLevel = 'guest';
	if (isAuthenticated && user?.userId) {
		// dashboard/pack: check if user is pack creator
		if (packCreatorId && user.userId === packCreatorId) {
			permissionLevel = 'creator';
		}
		// profile: check if viewing own profile
		else if (paramUserId && user.userId === paramUserId) {
			permissionLevel = 'creator';
		}
		// profile route (/profile with no userId param)
		else if (!paramUserId && !packCreatorId) {
			permissionLevel = 'creator';
		} else {
			permissionLevel = 'authenticated';
		}
	}

	const isGuest = permissionLevel === 'guest';
	const isAuth = permissionLevel === 'authenticated' || permissionLevel === 'creator';
	const isCreator = permissionLevel === 'creator';

	const isLoading = authLoading || (!options.pack && packLoading);

	return {
		permissionLevel,
		isGuest,
		isAuthenticated: isAuth,
		isCreator,
		user,
		isLoading,
	};
};
