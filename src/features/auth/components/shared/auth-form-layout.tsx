import { type ReactNode } from 'react';
import { Heading, Text } from '@radix-ui/themes';
import { Stack } from '@/components/layout';
import { LandingLink } from '@/components/ui';
import { Message } from '@/components/ui';
import { Segment } from '@/components/primitives';
import { AuthContainer, FormContainer } from '../form-components/form-components';
import { GoogleAuth } from '../google-auth';
import { LoginFooter, RegisterFooter } from './auth-footers';
import styles from '../form-components/form-components.module.css';
import { type FormError } from '@/types/form-types';

type AuthFormLayoutProps = {
	title: string;
	authMethod: 'signin' | 'signup';
	isRegister: boolean;
	serverError: FormError;
	children: ReactNode;
	updateServerError: (message: string) => void;
};

export const AuthFormLayout = ({
	title,
	authMethod,
	isRegister,
	serverError,
	children,
	updateServerError,
}: AuthFormLayoutProps) => {
	return (
		<AuthContainer>
			<FormContainer>
				<Stack className="gap-2">
					<Heading as="h1" size="8" className={`${styles.brandHeading} mb-4`}>
						<LandingLink>tidytrek</LandingLink>
					</Heading>
					<Segment radius="2">
						<Stack className="gap-2">
							<Heading as="h3" size="7" mb="4">
								{title}
							</Heading>

							<GoogleAuth authMethod={authMethod} updateServerError={updateServerError} />

							<Text align="center">or</Text>

							<div className="px-4">{children}</div>

							{serverError.error && (
								<Message
									messageType="error"
									text={serverError.message || 'Oops! There was an error.'}
									id="auth-message"
								/>
							)}

							{isRegister ? <RegisterFooter /> : <LoginFooter />}
						</Stack>
					</Segment>
				</Stack>
			</FormContainer>
		</AuthContainer>
	);
};
