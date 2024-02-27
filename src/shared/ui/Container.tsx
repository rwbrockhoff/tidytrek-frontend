import styled, { css } from 'styled-components';
import { flexCenter } from '../mixins/mixins';

export const Container = styled.div<{ $flexCenter?: boolean }>`
	${({ $flexCenter }) =>
		$flexCenter &&
		css`
			${flexCenter}
		`};
`;
