import { ComponentProps } from 'react';
import { RawTidytrekLogo } from './components/raw-logo';
import { cn } from '@/styles/utils';
import styles from './logo.module.css';

interface LogoProps extends ComponentProps<'svg'> {
	color?: 'primaryBrand' | 'black' | 'white' | 'primary' | 'secondary';
	size?: 'base' | 'small';
}

export const Logo = ({ color = 'primary', size = 'base', className, style, ...props }: LogoProps) => {
	return (
		<RawTidytrekLogo 
			className={cn(styles[color], styles[size], className)} 
			style={style} 
			{...props} 
		/>
	);
};
