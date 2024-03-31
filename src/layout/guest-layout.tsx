import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import styled from 'styled-components';
import { Fallback } from './fallback';

export const GuestLayout = () => {
	return (
		<GuestViewContainer>
			<Suspense fallback={<Fallback />}>
				<Outlet />
			</Suspense>
		</GuestViewContainer>
	);
};

const GuestViewContainer = styled.div`
	min-height: 100%;
	height: 100%;
	${({ theme: t }) => t.mx.themeBgColor('tidyBg', 'tidy')}
	overflow-y: scroll;
	padding-left: 10vw;
	padding-right: 10vw;
	padding-bottom: 2vh;
	padding-top: 5vh;
	${({ theme: t }) => t.mx.mobile(`padding: 2em 1em;`)}
	main {
		margin: 0 auto;
		min-height: 100%;
		max-width: var(--max-width);
		position: relative;
	}
`;
