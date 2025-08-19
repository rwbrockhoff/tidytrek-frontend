import { useRef, useEffect, ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

type TransitionOutletProps = { children: ReactNode };

export const TransitionOutlet = ({ children }: TransitionOutletProps) => {
	const location = useLocation();
	const previousChildRef = useRef<ReactNode>(children);

	useEffect(() => {
		// Small delay to let new component mount, then update
		const timer = setTimeout(() => {
			previousChildRef.current = children;
		}, 50);

		return () => clearTimeout(timer);
	}, [location.pathname, children]);

	// Render prev child during transition to prevent flash
	const displayChild = previousChildRef.current;

	return <>{displayChild}</>;
};
