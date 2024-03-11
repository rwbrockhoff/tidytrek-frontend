import { Icon, Button } from 'semantic-ui-react';
import styled, { css } from 'styled-components';

type SidebarButtonProps = {
	onClick: () => void;
	isSidebar: boolean;
};

export const SidebarButton = ({ onClick, isSidebar }: SidebarButtonProps) => {
	return (
		<StyledButton
			icon={<Icon name="sidebar" />}
			$isSidebar={isSidebar}
			onClick={onClick}
		/>
	);
};

const StyledButton = styled(Button)<{ $isSidebar: boolean }>`
	&&& {
		${(props) => !props.$isSidebar && props.theme.mx.mobile(`display: none`)}
		opacity: 0.4;
		background-color: transparent;

		${(props) =>
			props.$isSidebar &&
			css`
				color: white;
				position: absolute;
				right: 2em;
				opacity: 0.8;
			`};
	}
`;
