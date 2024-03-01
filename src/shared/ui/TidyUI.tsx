import styled from 'styled-components';
import { absoluteCenter, mobile } from '../mixins/mixins';
import { Loader as SemLoader } from 'semantic-ui-react';

export const SubText = styled.p`
	font-size: 0.9em;
	opacity: 0.7;
`;

export const Panel = styled.div<{ $width: string }>`
	width: ${({ $width }) => $width};
	${mobile(`
		width: 100%;
	`)}
`;

export const Loader = styled(SemLoader)`
	${absoluteCenter}
`;
