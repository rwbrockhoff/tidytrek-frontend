import { type ReactNode } from 'react';
import { Heading, Text } from '@radix-ui/themes';
import { Stack } from '@/components/layout';
import { LandingLink } from '@/components/ui';
import { Alert } from '@/components/ui';
import { Segment } from '@/components/primitives';
import { AuthContainer, FormContainer } from '../form-components/form-components';
import { GoogleAuth } from '../google-auth';
import { Logo } from '@/layout/logo';
import { LoginFooter, RegisterFooter } from './auth-footers';
import styles from '../form-components/form-components.module.css';
import { type FormError } from '@/types/form-types';

type AuthFormLayoutProps = {
	title: string;
	authMethod: 'signin' | 'signup';
	isRegister: boolean;
	serverError: FormError;
	children: ReactNode;
	additionalContent?: ReactNode;
	updateServerError: (message: string) => void;
};

export const AuthFormLayout = ({
	title,
	isRegister,
	serverError,
	children,
	updateServerError,
	additionalContent,
}: AuthFormLayoutProps) => {
	return (
		<AuthContainer>
			<FormContainer>
				<Stack className="gap-2">
					<Heading as="h1" size="8" className={styles.brandHeading}>
						<LandingLink>
							<Logo className="mx-auto mb-4" />
						</LandingLink>
					</Heading>
					<Segment radius="2">
						<Stack className="gap-2">
							<Heading as="h3" size="7" mb="4" className={styles.authTitle}>
								{title}
							</Heading>

							<GoogleAuth updateServerError={updateServerError} />

							<Text align="center">or</Text>

							<div className="px-4">{children}</div>

							{serverError.error && (
								<Alert variant="error" className="my-4" data-testid="auth-message-error">
									{serverError.message || 'There was an error.'}
								</Alert>
							)}

							{isRegister ? <RegisterFooter /> : <LoginFooter />}
						</Stack>
					</Segment>
					{additionalContent}
				</Stack>
			</FormContainer>
		</AuthContainer>
	);
};
