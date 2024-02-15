import { Popup, PopupContent } from 'semantic-ui-react';
import { Button } from '../../../../../shared/ui/SemanticUI';
import styled from 'styled-components';

const ThemeButton = ({ color }: { color: string }) => {
	return (
		<Popup
			on="click"
			trigger={
				<Container>
					<CircleButton $themeColor={color} circular />
				</Container>
			}>
			<PopupContent>
				<p>Choose your theme! Wow.</p>
			</PopupContent>
		</Popup>
	);
};

export default ThemeButton;

const Container = styled.div`
	margin-left: 5px;
	margin-right: 10px;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const CircleButton = styled(Button)`
	&&& {
		padding: 0px;
		width: 15px;
		heigh: 15px;
	}
`;
