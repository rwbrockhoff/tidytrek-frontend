import styled, { css, keyframes } from 'styled-components';

const spin = keyframes` 
  0% {
    transform: rotate(0deg)
  }
  100% {
    transform: rotate(360deg);
  }
`;

type SpinnerSize = '1' | '2' | '3' | '4';

const sizes = {
	'1': '1rem',
	'2': '2rem',
	'3': '3rem',
	'4': '4rem',
};

type SpinnerProps = {
	size?: SpinnerSize;
	active?: boolean;
	absoluteCenter?: boolean;
};

export const Spinner = (props: SpinnerProps) => {
	const { size = '2', active = false, absoluteCenter = false } = props;
	if (active) return <StyledSpinner $size={size} $absoluteCenter={absoluteCenter} />;
	else return null;
};

export const StyledSpinner = styled.div<{
	$size: SpinnerSize;
	$absoluteCenter: boolean;
}>`
	width: ${({ $size }) => sizes[$size]};
	height: ${({ $size }) => sizes[$size]};
	border: calc(${({ $size }) => sizes[$size]} / 12) solid var(--spinner-outer-bg-color);
	border-top: calc(${({ $size }) => sizes[$size]} / 12) solid
		var(--spinner-inner-bg-color);
	border-radius: 50%;
	animation: ${spin} 1s linear infinite;
	/* absolute center */
	${(props) =>
		props.$absoluteCenter &&
		css`
			${({ theme: t }) => t.mx.absoluteCenter}
			z-index: 10;
		`}
`;
