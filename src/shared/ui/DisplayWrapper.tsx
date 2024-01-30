type DisplayWrapperProps = {
	children: React.ReactNode;
	display: boolean;
};

const DisplayWrapper = ({ display, children }: DisplayWrapperProps) => {
	if (display) {
		return children;
	} else return null;
};

export default DisplayWrapper;
