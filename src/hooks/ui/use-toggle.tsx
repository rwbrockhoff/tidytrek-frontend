import { useState } from 'react';

type UseToggleReturn = {
	isToggled: boolean;
	toggleOpen: () => void;
	toggleClose: () => void;
	toggle: () => void;
};

export const useToggle = (initial = false): UseToggleReturn => {
	const [isToggled, setIsToggled] = useState(initial);

	const toggleOpen = () => setIsToggled(true);
	const toggleClose = () => setIsToggled(false);
	const toggle = () => setIsToggled((state) => !state);

	return { isToggled, toggleOpen, toggleClose, toggle };
};
