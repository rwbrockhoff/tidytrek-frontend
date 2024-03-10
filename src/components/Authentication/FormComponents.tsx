import styled from 'styled-components';
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
	width: calc(400px + 2em);

	${({ theme: t }) =>
		t.mx.mobile(`
		width: 90vw;
	`)}
`;

export const FooterText = styled.p`
	margin-top: 1em;
`;

export const AuthContainer = styled.main`
	${({ theme: t }) => t.mx.flexCenter}
	text-align: center;
	flex-direction: column;
	min-height: 100%;
	width: 100%;
	${({ theme: t }) => t.mx.themeBgColor(`tidyLightGrey`, 'tidy')}
`;
