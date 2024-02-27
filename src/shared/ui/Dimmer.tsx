import styled from 'styled-components';

type DimmerProps = {
	active: boolean;
	className?: string; // from styled-components
};

export const Dimmer = ({ active, className }: DimmerProps) => {
	return <CustomDimmer className={className} $active={active} />;
};

export default Dimmer;

const CustomDimmer = styled.div<{ $active?: boolean }>`
	position: absolute;
	background-color: black;
	transition: all 250ms ease;
	opacity: ${(props) => (props.$active ? '0.2' : 0)};
`;
