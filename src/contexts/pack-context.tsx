import { createContext, useMemo } from 'react';
import { usePackContext } from '@/features/dashboard/hooks/use-pack-context';

export type PackContextValue = ReturnType<typeof usePackContext>;

export const PackContext = createContext<PackContextValue | undefined>(undefined);

export const PackProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const packDetails = usePackContext();
	
	const value = useMemo(() => packDetails, [packDetails]);

	return <PackContext.Provider value={value}>{children}</PackContext.Provider>;
};