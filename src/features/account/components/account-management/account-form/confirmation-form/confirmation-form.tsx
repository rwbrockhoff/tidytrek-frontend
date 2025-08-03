import { Message } from '@/components/ui';
import { SendIcon, CheckIcon } from '@/components/icons';
import { Stack, Flex } from '@/components/layout';
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
		<Stack className="gap-8 max-w-md my-8">
			{confirmationSent ? (
				<Callout.Root color="grass" variant="surface">
					<Flex className="items-center gap-2">
						<CheckIcon />
						<Heading size="4">Email Sent!</Heading>
					</Flex>
					<Text>Check your email for your code to use below.</Text>
				</Callout.Root>
			) : (
				<Stack className="gap-4" stretch={false}>
					<Stack className="gap-2">
						<Heading size="4">Verify Email</Heading>
						<Text>Let's send a code to your email to get started.</Text>
					</Stack>

					{isError && errorMessage && <Message messageType="error" text={errorMessage} />}

					<Button
						variant="outline"
						onClick={sendConfirmation}
						iconLeft={<SendIcon />}
						override
						className="outline-button-dark">
						Send Email
					</Button>
				</Stack>
			)}
		</Stack>
	);
};
