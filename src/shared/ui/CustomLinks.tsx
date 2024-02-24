import { Link } from 'react-router-dom';
import styled from 'styled-components';

type CustomLinkProps = {
	link: string | undefined;
	externalLink?: boolean;
	enabled?: boolean;
	children: React.ReactNode;
};
export const CustomLink = ({
	link,
	externalLink,
	enabled = true,
	children,
}: CustomLinkProps) => {
	if (!enabled || !link) return children;
	if (externalLink) {
		return (
			<StyledLink to={link} target="_blank" rel="noopener noreferrer">
				{children}
			</StyledLink>
		);
	} else {
		return <StyledLink to={link}>{children}</StyledLink>;
	}
};

export const cleanUpLink = (link: string) => {
	if (!link) return '';
	if (link.includes('http:')) return link.replace('http:', 'https:');
	if (link.includes('https://')) return link;
	else return `https://${link}`;
};

const StyledLink = styled(Link)`
	color: ${(props) => props.theme.primary || 'inherit'};
	&:hover {
		color: ${(props) => props.theme.primary || 'inherit'};
		opacity: 0.9;
	}
`;
