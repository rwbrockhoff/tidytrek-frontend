import { ReactNode } from 'react';
import { UserPermissionsProvider } from '@/contexts/user-permissions-context';
import { PackPricingContext } from '@/contexts/pack-pricing-context';
import { DragDropWrapper } from '@/components/drag-drop/drag-drop-wrapper';
import { type UserPermissionLevel } from '@/hooks/auth/use-user-permissions';
import { createMockUser } from '@/tests/mocks/user-mocks';

// Use the modular wrappers below based on test requirements
// dragDrop, userPermissions, appLevel, or gearCloset

export const withDragDrop = (children: ReactNode) => (
	<DragDropWrapper onDragEnd={() => {}} renderDragOverlay={() => null}>
		{children}
	</DragDropWrapper>
);

export const withUserPermissions = (
	children: ReactNode,
	canEdit = true,
	pricing = false,
) => {
	const permissions = {
		permissionLevel: canEdit ? 'creator' : ('guest' as UserPermissionLevel),
		isGuest: !canEdit,
		isAuthenticated: canEdit,
		isCreator: canEdit,
		user: canEdit ? createMockUser() : null,
		isLoading: false,
	};

	return (
		<UserPermissionsProvider value={permissions}>
			<PackPricingContext.Provider value={pricing}>
				{children}
			</PackPricingContext.Provider>
		</UserPermissionsProvider>
	);
};

export const withDashboardContext = (
	children: ReactNode,
	options?: {
		isCreator?: boolean;
		pricing?: boolean;
	},
) => {
	const { isCreator = true, pricing = false } = options || {};

	return withUserPermissions(withDragDrop(children), isCreator, pricing);
};

export const withGearClosetContext = (
	children: ReactNode,
	options?: {
		isCreator?: boolean;
		pricing?: boolean;
	},
) => {
	const { isCreator = true, pricing = true } = options || {};

	return withUserPermissions(withDragDrop(children), isCreator, pricing);
};
