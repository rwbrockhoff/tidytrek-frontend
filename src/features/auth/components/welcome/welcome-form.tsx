import { Text, Heading } from '@radix-ui/themes';
import { Flex, Stack } from '@/components/layout';
import { Link } from '@/components/ui';
import { Segment } from '@/components/primitives';
import { FormContainer } from '../form-components/form-components';
import { ForwardArrowIcon } from '@/components/icons';
import { Logo } from '@/layout/logo';
import { WelcomeFormFields } from './welcome-form-fields';
import { useWelcomeForm } from '../../hooks/use-welcome-form';
import { AuthFlowType } from '../../constants/auth-flow-types';
import styles from '../form-components/form-components.module.css';

type WelcomeFormProps = {
	defaultUsername: string | undefined;
	authFlowType: AuthFlowType;
};

export const WelcomeForm = ({ defaultUsername }: WelcomeFormProps) => {
	const {
		formData,
		isPending,
		serverError,
		formErrors,
		handleInput,
		handleGenerateUsername,
		handleFormSubmit,
	} = useWelcomeForm({ defaultUsername });

	return (
		<FormContainer>
			<Stack className="gap-2">
				<Heading as="h1" size="8" className={styles.brandHeading}>
					<Link to="/" viewTransition><Logo className="mx-auto mb-4" /></Link>
				</Heading>
				<Segment radius="2">
					<Stack className="gap-2">
					<Heading as="h3" size="7" className={styles.authTitle}>
						Welcome!
					</Heading>

					<Text>Pick your username and trail name.</Text>

					<div className={styles.welcomeFormFields}>
						<WelcomeFormFields
							formData={formData}
							isPending={isPending}
							serverError={serverError}
							formErrors={formErrors}
							onInput={handleInput}
							onGenerateUsername={handleGenerateUsername}
							onSubmit={handleFormSubmit}
						/>
					</div>

					<Flex className="justify-center">
						<Text size="3">
							<Link to="/" viewTransition>
								<ForwardArrowIcon /> Skip this step for now
							</Link>
						</Text>
					</Flex>
					</Stack>
				</Segment>
			</Stack>
		</FormContainer>
	);
};
