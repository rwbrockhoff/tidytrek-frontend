import { frontendURL } from '@/api/tidytrek-api';

type LandingLinkProps = {
	to?: string;
	children: React.ReactNode;
};

export const LandingLink = ({ to = '', children }: LandingLinkProps) => {
	const href = to.startsWith('/') ? `${frontendURL}${to}` : `${frontendURL}/${to}`;
	return (
		<a href={href} rel="noopener noreferrer">
			{children}
		</a>
	);
};
