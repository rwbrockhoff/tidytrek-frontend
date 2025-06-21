import styles from './dimmer.module.css';

type DimmerProps = {
	active: boolean;
	className?: string;
};

export const Dimmer = ({ active, className }: DimmerProps) => {
	return (
		<div
			className={`${styles.dimmer} ${className || ''}`}
			style={{ '--dimmer-opacity': active ? '0.2' : '0' } as React.CSSProperties}
		/>
	);
};

export default Dimmer;
