import { useState } from 'react';
import { HoverContext } from './hover-context';

type MouseOverProps = {
	children: React.ReactNode;
};

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
