import styles from './form-components.module.css';
import { Flex } from '@radix-ui/themes';

export const FormContainer = ({ children, ...props }: { children: React.ReactNode }) => (
	<div className={styles.formContainer} {...props}>
		{children}
	</div>
);

export const AuthContainer = ({ children, ...props }: { children: React.ReactNode }) => (
	<Flex 
		asChild
		justify="center" 
		align="center" 
		direction="column"
		className={styles.authContainer}
		{...props}
	>
		<main>
			{children}
		</main>
	</Flex>
);
