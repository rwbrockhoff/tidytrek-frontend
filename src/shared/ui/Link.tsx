import { Icon } from 'semantic-ui-react';

type LinkProps = {
	url: string;
	text: string;
	showIcon?: boolean;
	className?: string;
};

const Link = ({ url, text, showIcon = false, className }: LinkProps) => {
	if (url) {
		return (
			<a href={`https://${url}`} target="_blank" rel="noopener noreferrer">
				<p className={className}>
					{showIcon && <Icon name="linkify" />}
					{text}
				</p>
			</a>
		);
	} else {
		return <p className={className}>{text}</p>;
	}
};

export default Link;
