import { Link as RouterLink } from 'react-router-dom';
import { FaLink } from 'react-icons/fa';
import { Icon } from '@/components/ui';
import { Text } from '@radix-ui/themes';
import { cn } from '@/styles/utils/cn';
import styles from './link.module.css';

type LinkProps = {
	link: string | undefined;
	children: React.ReactNode;
	externalLink?: boolean;
	enabled?: boolean;
	className?: string;
};

export const Link = (props: LinkProps) => {
	const { link, externalLink, enabled = true, className = '', children } = props;
	
	if (!enabled || !link) return children;
	
	if (externalLink) {
		return (
			<RouterLink
				to={link}
				target="_blank"
				rel="noopener noreferrer"
				className={cn(styles.link, className)}>
				{children}
			</RouterLink>
		);
	} else {
		return (
			<RouterLink 
				to={link} 
				className={cn(styles.link, className)} 
				onClick={() => window.scrollTo(0, 0)}
			>
				{children}
			</RouterLink>
		);
	}
};

type DisplayLinkProps = {
	url: string;
	text: string;
	showIcon?: boolean;
	margin?: string;
};

export const DisplayLink = (props: DisplayLinkProps) => {
	const { url, text, showIcon = false, margin } = props;
	if (url) {
		return (
			<a
				href={url}
				className={styles.displayLink}
				target="_blank"
				rel="noopener noreferrer"
				style={{ margin }}>
				<Text style={{ display: 'inline-flex' }}>
					{showIcon && (
						<Icon>
							<FaLink />
						</Icon>
					)}
					{text}
				</Text>
			</a>
		);
	} else {
		return <p>{text}</p>;
	}
};

export const cleanUpLink = (link: string) => {
	if (!link) return '';
	if (link.includes('http:')) return link.replace('http:', 'https:');
	if (link.includes('https://')) return link;
	else return `https://${link}`;
};
