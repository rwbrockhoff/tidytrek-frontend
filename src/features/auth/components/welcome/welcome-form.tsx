import { Link as RouterLink } from 'react-router-dom';
import { Text, Heading } from '@radix-ui/themes';
import { Flex } from '@/components/layout';
import { Link } from '@/components/ui';
import { Segment } from '@/components/primitives';
import { FormContainer } from '../form-components/form-components';
import { WelcomeFormFields } from './welcome-form-fields';
import { useWelcomeForm } from '../../hooks/use-welcome-form';
import styles from '../form-components/form-components.module.css';

type WelcomeFormProps = {
	defaultUsername: string | undefined;
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
			<Heading as="h1" size="8" mb="6" className={styles.brandHeading}>
				<Link to="/">tidytrek</Link>
			</Heading>
			<Segment radius="2">
				<Heading as="h3" size="7" mb="6">
					Welcome to tidytrek!
				</Heading>

				<Text as="p" mb="4">
					Please choose a username and trail name to get started.
				</Text>

				<WelcomeFormFields
					formData={formData}
					isPending={isPending}
					serverError={serverError}
					formErrors={formErrors}
					onInput={handleInput}
					onGenerateUsername={handleGenerateUsername}
					onSubmit={handleFormSubmit}
				/>

				<Flex className="mt-4 justify-center">
					<Text size="3">
						<RouterLink to={'/'}>Back to login</RouterLink>
					</Text>
				</Flex>
			</Segment>
		</FormContainer>
	);
};