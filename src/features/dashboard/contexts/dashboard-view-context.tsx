import { createContext, ReactNode } from 'react';

export type DashboardViewContextType = {
	/** True if user can edit the pack (creator or has permissions) */
	canEdit: boolean;
	/** True if viewing in preview mode (creator viewing their pack at /pk/ route) */
	isPreviewMode: boolean;
};

export const DashboardViewContext = createContext<DashboardViewContextType>({
	canEdit: false,
	isPreviewMode: false,
});

type DashboardViewProviderProps = {
	children: ReactNode;
	canEdit: boolean;
	isPreviewMode: boolean;
};

export const DashboardViewProvider = ({ 
	children, 
	canEdit, 
	isPreviewMode 
}: DashboardViewProviderProps) => {
	return (
		<DashboardViewContext.Provider value={{ canEdit, isPreviewMode }}>
			{children}
		</DashboardViewContext.Provider>
	);
};