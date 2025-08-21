import { ComponentProps } from 'react';

interface RawSimpleLogoProps extends ComponentProps<'svg'> {}

export const RawSimpleLogo = ({ className, ...props }: RawSimpleLogoProps) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 451 413"
		className={className}
		{...props}>
		<path
			fill="currentColor"
			d="M225 335c117.084 0 212 17.461 212 39s-94.916 39-212 39-212-17.461-212-39 94.916-39 212-39"></path>
		<path
			fill="currentColor"
			d="M156.012 40c30.792-53.333 107.772-53.333 138.564 0l145.175 251.45c18.614 32.241 11.908 69.352-9.911 93.665L258.328 83.457c-14.569-25.624-51.499-25.624-66.068 0L20.747 385.115c-21.819-24.313-28.524-61.424-9.91-93.665z"></path>
		<path stroke="currentColor" strokeWidth="40" d="M225 22v385"></path>
	</svg>
);
