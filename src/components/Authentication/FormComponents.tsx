import styled from 'styled-components';
import { flexCenter, mobile, themeBgColor } from '../../shared/mixins/mixins';
import { Icon, Message } from 'semantic-ui-react';

type FormMessageProps = {
	messageType: 'success' | 'error';
	text: string;
	id: string;
};

export const FormMessage = (props: FormMessageProps) => {
	const { messageType, text, id } = props;

	const messageColor = messageType === 'success' ? 'green' : 'red';
	const messageIcon = messageType === 'success' ? 'check' : 'hand point right outline';
	return (
		<Message color={messageColor} data-testid={`${id}-${messageType}`}>
			<Icon name={messageIcon} />
			{text}
		</Message>
	);
};

export const FormContainer = styled.div`
	width: 30vw;

	${mobile(`
		width: 90vw;
	`)}
`;

export const FooterText = styled.p`
	margin-top: 1rem;
`;

export const AuthContainer = styled.div`
	${flexCenter}
	text-align: center;
	flex-direction: column;
	height: 100vh;
	width: 100%;
	${themeBgColor('lightGrey')}
`;
