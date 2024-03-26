import styled from 'styled-components';

export const FormContainer = styled.div`
	width: calc(400px + 2em);

	${({ theme: t }) =>
		t.mx.mobile(`
		width: 90vw;
	`)}
`;

export const AuthContainer = styled.main`
	${({ theme: t }) => t.mx.flexCenter}
	flex-direction: column;
	text-align: center;
	min-height: 100%;
	width: 100%;
	background-color: var(--slate-3);
`;
