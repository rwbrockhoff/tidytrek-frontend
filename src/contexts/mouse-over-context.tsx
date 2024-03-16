import { useState, createContext } from 'react';

type MouseOverProps = {
	children: React.ReactNode;
};

export const HoverContext = createContext(false);

export const MouseOver = ({ children }: MouseOverProps) => {
	const [isHovering, setIsHovering] = useState(false);

	return (
		<HoverContext.Provider value={isHovering}>
			<div
				onMouseOver={() => setIsHovering(true)}
				onMouseLeave={() => setIsHovering(false)}
				style={{
					width: 'fit-content',
					height: 'fit-content',
				}}>
				{children}
			</div>
		</HoverContext.Provider>
	);
};
