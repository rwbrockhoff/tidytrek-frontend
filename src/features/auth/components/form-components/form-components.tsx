import styles from './form-components.module.css';
import { cn } from '@/styles/utils';

export const FormContainer = ({ children, ...props }: { children: React.ReactNode }) => (
	<div className={styles.formContainer} {...props}>
		{children}
	</div>
);

export const AuthContainer = ({ children, ...props }: { children: React.ReactNode }) => (
	<main 
		className={cn(styles.authContainer, "flex flex-col justify-center items-center")}
		{...props}
	>
		{children}
	</main>
);
