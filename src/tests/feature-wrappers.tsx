import { ReactNode } from 'react';
import { UserPermissionsProvider } from '@/contexts/user-permissions-context';
import { PackPricingContext } from '@/contexts/pack-pricing-context';
import { DragDropContext, Drop } from '@/components/drag-drop/drag-drop-wrapper';
import { type UserPermissionLevel } from '@/hooks/auth/use-user-permissions';
import { createMockUser } from '@/tests/mocks/user-mocks';

// Use the modular wrappers below based on test requirements

// Drag & Drop wrapper
export const withDragDrop = (
	children: ReactNode,
	droppableId = 'test-drop',
	type = 'category',
) => (
	<DragDropContext onDragEnd={() => {}}>
		<Drop droppableId={droppableId} type={type}>
			{children}
		</Drop>
	</DragDropContext>
);

// User permissions wrapper
export const withUserPermissions = (
	children: ReactNode,
	canEdit = true,
	pricing = false,
) => {
	const permissions = {
		permissionLevel: canEdit ? 'creator' : 'guest' as UserPermissionLevel,
		isGuest: !canEdit,
		isAuthenticated: canEdit,
		isCreator: canEdit,
		user: canEdit ? createMockUser() : null,
		isLoading: false,
	};

	return (
		<UserPermissionsProvider value={permissions}>
			<PackPricingContext.Provider value={pricing}>{children}</PackPricingContext.Provider>
		</UserPermissionsProvider>
	);
};

// Common dashboard component wrapper - combines all the above
export const withDashboardContext = (
	children: ReactNode,
	options?: {
		isCreator?: boolean;
		pricing?: boolean;
		droppableId?: string;
		dragType?: string;
	},
) => {
	const {
		isCreator = true,
		pricing = false,
		droppableId = 'dashboard-drop-window',
		dragType = 'category',
	} = options || {};

	return withUserPermissions(
		withDragDrop(children, droppableId, dragType),
		isCreator,
		pricing,
	);
};

// Gear Closet specific wrapper - simpler than dashboard
export const withGearClosetContext = (
	children: ReactNode,
	options?: {
		isCreator?: boolean;
		pricing?: boolean;
		droppableId?: string;
		dragType?: string;
	},
) => {
	const {
		isCreator = true,
		pricing = true,
		droppableId = 'gear-closet',
		dragType = 'closet-item',
	} = options || {};

	return withUserPermissions(
		withDragDrop(children, droppableId, dragType),
		isCreator,
		pricing,
	);
};
