import { Button as SemanticButton, Popup, PopupContent } from 'semantic-ui-react';
import styled, { css } from 'styled-components';

const ThemeButton = ({ color }: { color: string }) => {
	return (
		<Popup
			on="click"
			trigger={
				<Container>
					<Button $backgroundColor={color} circular />
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

const Button = styled(SemanticButton)<{ $backgroundColor?: string }>`
	&&& {
		padding: 0px;
		width: 15px;
		heigh: 15px;
		${(props) =>
			props.$backgroundColor &&
			css`
				background-color: ${props.$backgroundColor};
			`};
	}
`;
