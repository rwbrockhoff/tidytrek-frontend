import { useEffect, useMemo } from 'react';
import { useNavigation } from 'react-router-dom';
import { useLoading } from './use-loading';

export const useLayoutLoading = (isPending: boolean) => {
	const { setLoading } = useLoading();
	const navigation = useNavigation();

	const isNavigating = navigation.state !== 'idle';

	// true if navigating OR queries are pending
	const shouldLoad = useMemo(() => isNavigating || isPending, [isNavigating, isPending]);

	useEffect(() => {
		setLoading(shouldLoad);
	}, [shouldLoad, setLoading]);
};
