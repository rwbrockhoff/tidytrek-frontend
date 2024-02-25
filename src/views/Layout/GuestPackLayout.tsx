import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { mobile } from '../../shared/mixins/mixins';

const GuestPackLayout = () => {
	return (
		<div id="app-view-container">
			<GuestViewContainer>
				<Outlet />
			</GuestViewContainer>
		</div>
	);
};

export default GuestPackLayout;

const GuestViewContainer = styled.div`
	width: 100vw;
	height: 100vh;
	overflow-y: auto;
	padding-left: 10vw;
	padding-right: 10vw;
	padding-bottom: 2vh;
	padding-top: 5vh;
	${mobile(`
		padding: 25px 25px;
	`)}
`;
