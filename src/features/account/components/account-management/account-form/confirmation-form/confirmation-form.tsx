import styles from './confirmation-form.module.css';
import { Message } from '@/components/ui';
import { cn } from '@/styles/utils';
import { SendIcon, CheckIcon } from '@/components/icons';
import { Flex } from '@/components/layout';
import { Callout, Heading, Text } from '@radix-ui/themes';
import { Button } from '@/components/alpine';

type ConfirmationFormProps = {
	sendConfirmation: () => void;
	confirmationSent: boolean;
	isError?: boolean;
	errorMessage?: string;
};

export const ConfirmationForm = ({
	sendConfirmation,
	confirmationSent,
	isError,
	errorMessage,
}: ConfirmationFormProps) => {
	return (
		<div className={styles.confirmationContainer}>
			{confirmationSent ? (
				<Callout.Root color="grass" variant="surface">
					<Flex className={cn(styles.styledHeading, 'items-center')}>
						<Heading size="4">
							<CheckIcon />
							Email Sent!
						</Heading>
					</Flex>
					<Text mb="2">Check your email for your code to use below.</Text>
				</Callout.Root>
			) : (
				<Callout.Root color="gray" variant="surface">
					<Heading size="4">Verify Email</Heading>
					<Text mb="2">Let's send a code to your email to get started.</Text>

					{isError && errorMessage && <Message messageType="error" text={errorMessage} />}

					<Button variant="outline" onClick={sendConfirmation} iconLeft={<SendIcon />}>
						Send Email
					</Button>
				</Callout.Root>
			)}
		</div>
	);
};
