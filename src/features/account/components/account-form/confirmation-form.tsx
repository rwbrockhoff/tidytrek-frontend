import styled from 'styled-components';
import { SendIcon, CheckIcon } from '@/components/ui';
import { Callout, Button, Heading, Text } from '@radix-ui/themes';

type ConfirmationFormProps = { sendConfirmation: () => void; confirmationSent: boolean };

export const ConfirmationForm = (props: ConfirmationFormProps) => {
	const { sendConfirmation, confirmationSent } = props;
	return (
		<ConfirmationContainer>
			{confirmationSent ? (
				<Callout.Root color="grass" variant="surface">
					<StyledHeading size="4">
						<CheckIcon />
						Email Sent!
					</StyledHeading>
					<Text mb="2">Check your email for your code to use below.</Text>
				</Callout.Root>
			) : (
				<Callout.Root color="gray" variant="surface">
					<Heading size="4">Verify Email</Heading>
					<Text mb="2">Let's send a code to your email to get started.</Text>
					<Button color="gray" variant="outline" onClick={sendConfirmation}>
						<SendIcon />
						Send Email
					</Button>
				</Callout.Root>
			)}
		</ConfirmationContainer>
	);
};

const ConfirmationContainer = styled.div`
	width: 40%;
	margin: 2em 0em 2em 0em;
	button {
		cursor: pointer;
	}
`;

const StyledHeading = styled(Heading)`
	display: flex;
	align-items: center;
	svg {
		margin-right: 5px;
	}
`;
