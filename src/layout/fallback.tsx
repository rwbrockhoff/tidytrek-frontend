import { Loader } from 'semantic-ui-react';
import styled from 'styled-components';

export const Fallback = () => {
	return (
		<FallbackContainer>
			<Loader size="large" active />
		</FallbackContainer>
	);
};

export const SidebarFallback = () => {
	return <StyledLoader size="small" active inverted />;
};

const FallbackContainer = styled.div`
	width: 100%;
	height: 100%;
	${({ theme: t }) => t.mx.flexCenter()}
`;

const StyledLoader = styled(Loader)`
	&&& {
		left: 50px;
		top: 25%;
		transform: translate(50%, -50%);
	}
`;
