import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import styled from 'styled-components';
import { Loader } from 'semantic-ui-react';

export const GuestLayout = () => {
	return (
		<GuestViewContainer>
			<Suspense
				fallback={
					<FallbackContainer>
						<Loader size="big" />
					</FallbackContainer>
				}>
				<Outlet />
			</Suspense>
		</GuestViewContainer>
	);
};

const GuestViewContainer = styled.div`
	width: 100vw;
	height: 100%;
	${({ theme: t }) => t.mx.themeBgColor('tidyBg', 'tidy')}
	overflow-y: auto;
	padding-left: 10vw;
	padding-right: 10vw;
	padding-bottom: 2vh;
	padding-top: 5vh;
	${({ theme: t }) => t.mx.mobile(`padding: 25px 25px;`)}
`;

const FallbackContainer = styled.div`
	width: 100%;
	height: 100%;
	${({ theme: t }) => t.mx.flexCenter()}
`;
