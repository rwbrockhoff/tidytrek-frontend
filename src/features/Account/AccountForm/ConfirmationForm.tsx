import { Icon, Message, MessageHeader } from 'semantic-ui-react';
import { Button } from '../../../components/ui/SemanticUI';
import styled from 'styled-components';
import { SubText } from '../../../components/ui/TidyUI';

type ConfirmationFormProps = { sendConfirmation: () => void; confirmationSent: boolean };

const ConfirmationForm = ({
	sendConfirmation,
	confirmationSent,
}: ConfirmationFormProps) => {
	return (
		<ConfirmationContainer>
			{!confirmationSent ? (
				<Message style={{ width: messageWidth }}>
					<MessageHeader>Verify Email </MessageHeader>
					<SubText>Let's send a code to your email to get started.</SubText>
					<Button basic onClick={sendConfirmation}>
						<Icon name="send" />
						Send Code
					</Button>
				</Message>
			) : (
				<Message style={{ width: messageWidth }} success>
					<MessageHeader>
						<Icon name="check" />
						Code Sent{' '}
					</MessageHeader>
					<SubText>Check your email for your code to use below.</SubText>
				</Message>
			)}
		</ConfirmationContainer>
	);
};

export default ConfirmationForm;

const ConfirmationContainer = styled.div`
	margin: 2em 0em 2em 0em;
`;

// defaults
const messageWidth = '50%';
