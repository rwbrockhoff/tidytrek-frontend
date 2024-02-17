import { Popup as SemPopup, PopupContent } from 'semantic-ui-react';
import { Button } from '../../../../../shared/ui/SemanticUI';
import styled, { useTheme } from 'styled-components';
import { CategoryChanges } from '../../PackCategory';

type ThemeButtonProps = {
	color: string;
	onClick: (categoryChanges: CategoryChanges) => void;
};

const ThemeButton = ({ color, onClick }: ThemeButtonProps) => {
	const theme = useTheme();
	const handleOnClick = (color: string) => onClick({ packCategoryColor: color });
	return (
		<Popup
			on="click"
			trigger={
				<Container>
					<CircleButton $themeColor={color} circular />
				</Container>
			}>
			<PopupContent>
				<PopupContainer>
					{Object.keys(theme).map((color, index) => (
						<CircleButton
							key={color || index}
							$themeColor={color}
							circular
							onClick={() => handleOnClick(color)}
						/>
					))}
				</PopupContainer>
			</PopupContent>
		</Popup>
	);
};

export default ThemeButton;

const Container = styled.div`
	margin: 0px 5px;
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

const PopupContainer = styled.div`
	&&& {
		display: flex;
		button {
			margin: 10px;
		}
	}
`;

const Popup = styled(SemPopup)`
	&&&& {
		margin-left: -12px;
	}
`;
