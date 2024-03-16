import styled from 'styled-components';

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
