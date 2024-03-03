import { Icon, Button } from 'semantic-ui-react';
import styled, { css } from 'styled-components';

type SidebarButtonProps = {
	onClick: () => void;
	isSidebar: boolean;
};

const SidebarButton = ({ onClick, isSidebar }: SidebarButtonProps) => {
	return (
		<StyledButton
			icon={<Icon name="sidebar" />}
			$isSidebar={isSidebar}
			onClick={onClick}
		/>
	);
};

export default SidebarButton;

const StyledButton = styled(Button)<{ $isSidebar: boolean }>`
	&&& {
		opacity: 0.4;
		background-color: transparent;

		${(props) =>
			props.$isSidebar &&
			css`
				color: white;
				position: absolute;
				right: 25px;
				opacity: 0.8;
			`};
	}
`;
