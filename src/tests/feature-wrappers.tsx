import { ReactNode } from 'react';
import { UserViewContext, PricingContext } from '@/hooks/use-viewer-context';
import { DragDropContext, Drop } from '@/components/drag-drop/drag-drop-wrapper';

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

// User context wrapper
export const withUserContext = (
	children: ReactNode,
	userView = true,
	pricing = false,
) => (
	<UserViewContext.Provider value={userView}>
		<PricingContext.Provider value={pricing}>{children}</PricingContext.Provider>
	</UserViewContext.Provider>
);

// Common dashboard component wrapper - combines all the above
export const withDashboardContext = (
	children: ReactNode,
	options?: {
		userView?: boolean;
		pricing?: boolean;
		droppableId?: string;
		dragType?: string;
	},
) => {
	const {
		userView = true,
		pricing = false,
		droppableId = 'dashboard-drop-window',
		dragType = 'category',
	} = options || {};

	return withUserContext(
		withDragDrop(children, droppableId, dragType),
		userView,
		pricing,
	);
};

// Gear Closet specific wrapper - simpler than dashboard
export const withGearClosetContext = (
	children: ReactNode,
	options?: {
		userView?: boolean;
		pricing?: boolean;
		droppableId?: string;
		dragType?: string;
	},
) => {
	const {
		userView = true,
		pricing = true,
		droppableId = 'gear-closet',
		dragType = 'closet-item',
	} = options || {};

	return withUserContext(
		withDragDrop(children, droppableId, dragType),
		userView,
		pricing,
	);
};
