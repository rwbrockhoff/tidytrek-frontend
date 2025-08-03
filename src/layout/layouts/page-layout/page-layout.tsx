import { ReactNode } from 'react';
import styles from './page-layout.module.css';
import { cn } from '@/styles/utils';

type PageLayoutProps = {
	children: ReactNode;
	className?: string;
};

export const PageLayout = ({ children, className }: PageLayoutProps) => {
	return <main className={cn(styles.pageLayout, className)}>{children}</main>;
};
