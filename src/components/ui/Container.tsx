import styled, { css } from 'styled-components';

export const Container = styled.div<{ $flexCenter?: boolean }>`
	${({ $flexCenter }) =>
		$flexCenter &&
		css`
			${({ theme: t }) => t.mx.flexCenter()}
		`};
`;
