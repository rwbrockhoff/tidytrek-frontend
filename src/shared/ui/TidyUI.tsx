import styled from 'styled-components';
import { Loader as SemLoader } from 'semantic-ui-react';

export const SubText = styled.p`
	font-size: 0.9em;
	opacity: 0.7;
`;

export const Panel = styled.div<{ $width: string }>`
	width: ${({ $width }) => $width};
	${({ theme: t }) =>
		t.mx.mobile(`
			width: 100%;
	`)}
`;

export const Loader = styled(SemLoader)`
	${({ theme: t }) => t.mx.absoluteCenter}
`;
