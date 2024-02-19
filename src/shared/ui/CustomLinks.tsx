import { Link } from 'react-router-dom';

type CustomLinkProps = {
	link: string | undefined;
	externalLink?: boolean;
	enabled?: boolean;
	children: React.ReactNode;
};
export const CustomLink = ({
	link,
	externalLink,
	enabled,
	children,
}: CustomLinkProps) => {
	if (!enabled || !link) return children;
	if (externalLink) {
		return (
			<Link to={link} target="_blank" rel="noopener noreferrer">
				{children}
			</Link>
		);
	} else {
		return <Link to={link}>{children}</Link>;
	}
};

export const cleanUpLink = (link: string) => {
	if (!link) return '';
	if (link.includes('http:')) return link.replace('http:', 'https:');
	if (link.includes('https://')) return link;
	else return `https://${link}`;
};
