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
			<Link to={`https://${link}`} target="_blank" rel="noopener noreferrer">
				{children}
			</Link>
		);
	} else {
		return <Link to={`https://${link}`}>{children}</Link>;
	}
};
