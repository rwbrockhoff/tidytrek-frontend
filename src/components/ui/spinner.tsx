import { cn } from '@/styles/utils/cn';
import styles from './spinner.module.css';

type SpinnerSize = '1' | '2' | '3' | '4';

type SpinnerProps = {
	size?: SpinnerSize;
	active?: boolean;
	absoluteCenter?: boolean;
};

export const Spinner = (props: SpinnerProps) => {
	const { size = '2', active = false, absoluteCenter = false } = props;
	
	if (!active) return null;

	return (
		<div 
			className={cn(
				styles.spinner,
				styles[`size${size}`],
				absoluteCenter && styles.absoluteCenter
			)} 
		/>
	);
};
