import { createContext, useState, ReactNode } from 'react';

export type LoadingContextType = {
	loading: boolean;
	setLoading: (loading: boolean) => void;
};

export const LoadingContext = createContext<LoadingContextType>({
	loading: false,
	setLoading: () => {},
});

export const LoadingProvider = ({ children }: { children: ReactNode }) => {
	const [loading, setLoading] = useState(true); // Start as true/loading to prevent flash

	return (
		<LoadingContext.Provider value={{ loading, setLoading }}>
			{children}
		</LoadingContext.Provider>
	);
};
