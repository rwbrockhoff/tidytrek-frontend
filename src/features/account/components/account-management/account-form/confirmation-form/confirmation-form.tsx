import { Message } from '@/components/ui';
import { SendIcon } from '@/components/icons';
import { Stack } from '@/components/layout';
import { Heading, Text } from '@radix-ui/themes';
import { Button } from '@/components/alpine';

type ConfirmationFormProps = {
	sendConfirmation: () => void;
	isError?: boolean;
	errorMessage?: string;
};

export const ConfirmationForm = ({
	sendConfirmation,
	isError,
	errorMessage,
}: ConfirmationFormProps) => {
	return (
		<Stack className="gap-4 max-w-md my-8" stretch={false}>
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
	);
};
