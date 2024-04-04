import { useState, useCallback } from 'react';

export const useToggle = (initial = false) => {
	const [isToggled, setIsToggled] = useState(initial);

	const toggleOpen = useCallback(() => setIsToggled(true), []);
	const toggleClose = useCallback(() => setIsToggled(false), []);
	const toggle = useCallback(() => setIsToggled((state) => !state), []);

	return { isToggled, toggleOpen, toggleClose, toggle };
};
