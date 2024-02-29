import { Dimmer as SemDimmer } from 'semantic-ui-react';
import styled from 'styled-components';

export const SubText = styled.p`
	font-size: 0.9em;
	opacity: 0.7;
`;

export const Dimmer = styled(SemDimmer)`
	width: 100%;
	height: 100%;
`;

export const Panel = styled.div<{ $width: string }>`
	width: ${({ $width }) => $width};
`;
