import styles from './confirmation-form.module.css';
import { SendIcon, CheckIcon, Message } from '@/components/ui';
import { Callout, Button, Heading, Text, Flex } from '@radix-ui/themes';

type ConfirmationFormProps = { 
	sendConfirmation: () => void; 
	confirmationSent: boolean;
	isError?: boolean;
	errorMessage?: string;
};

export const ConfirmationForm = ({ sendConfirmation, confirmationSent, isError, errorMessage }: ConfirmationFormProps) => {
	return (
		<div className={styles.confirmationContainer}>
			{confirmationSent ? (
				<Callout.Root color="grass" variant="surface">
					<Flex align="center" className={styles.styledHeading}>
						<Heading size="4">
							<CheckIcon size={16} />
							Email Sent!
						</Heading>
					</Flex>
					<Text mb="2">Check your email for your code to use below.</Text>
				</Callout.Root>
			) : (
				<Callout.Root color="gray" variant="surface">
					<Heading size="4">Verify Email</Heading>
					<Text mb="2">Let's send a code to your email to get started.</Text>
					
					{isError && errorMessage && (
						<Message messageType="error" text={errorMessage} />
					)}
					
					<Button color="gray" variant="outline" onClick={sendConfirmation}>
						<SendIcon size={16} />
						Send Email
					</Button>
				</Callout.Root>
			)}
		</div>
	);
};

