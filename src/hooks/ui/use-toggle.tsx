import { useState, useCallback } from 'react';

type UseToggleReturn = {
	isToggled: boolean;
	toggleOpen: () => void;
	toggleClose: () => void;
	toggle: () => void;
};

export const useToggle = (initial = false): UseToggleReturn => {
	const [isToggled, setIsToggled] = useState(initial);

	const toggleOpen = useCallback(() => setIsToggled(true), []);
	const toggleClose = useCallback(() => setIsToggled(false), []);
	const toggle = useCallback(() => setIsToggled((state) => !state), []);

	return { isToggled, toggleOpen, toggleClose, toggle };
};
