import { ComponentProps } from 'react';
import { RawSimpleLogo } from './components/raw-simple-logo';
import { cn } from '@/styles/utils';
import styles from './logo.module.css';

interface SimpleLogoProps extends ComponentProps<'svg'> {
	color?: 'primaryBrand' | 'black' | 'white' | 'primary' | 'secondary';
	size?: 'base' | 'small';
}

export const SimpleLogo = ({ color = 'primary', size = 'base', className, style, ...props }: SimpleLogoProps) => {
	return (
		<RawSimpleLogo 
			className={cn(styles[color], styles[size], className)} 
			style={style} 
			{...props} 
		/>
	);
};