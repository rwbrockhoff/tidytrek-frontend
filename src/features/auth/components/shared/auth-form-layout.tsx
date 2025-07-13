import { type ReactNode } from 'react';
import { Heading, Text, Box } from '@radix-ui/themes';
import { LandingLink } from '@/components/ui';
import { Message } from '@/components/ui';
import { Segment } from '@/components/primitives';
import { FormContainer } from '../form-components/form-components';
import { GoogleAuth } from '../google-auth';
import { LoginFooter, RegisterFooter } from './auth-footers';
import styles from '../form-components/form-components.module.css';
import { type FormError } from '@/types/form-types';

type AuthFormLayoutProps = {
	title: string;
	googleContext: 'signin' | 'signup';
	isRegister: boolean;
	serverError: FormError;
	children: ReactNode;
	updateServerError: (message: string) => void;
};

export const AuthFormLayout = ({
	title,
	googleContext,
	isRegister,
	serverError,
	children,
	updateServerError,
}: AuthFormLayoutProps) => {
	return (
		<FormContainer>
			<Heading as="h1" size="8" mb="6" className={styles.brandHeading}>
				<LandingLink>tidytrek</LandingLink>
			</Heading>
			<Segment radius="2">
				<Heading as="h3" size="7" mb="6">
					{title}
				</Heading>

				<GoogleAuth
					context={googleContext}
					updateServerError={updateServerError}
				/>

				<Text>or</Text>

				<Box px="4" my="4">
					{children}
				</Box>

				{serverError.error && (
					<Message
						messageType="error"
						text={serverError.message || 'Oops! There was an error.'}
						id="auth-message"
					/>
				)}

				{isRegister ? <RegisterFooter /> : <LoginFooter />}
			</Segment>
		</FormContainer>
	);
};