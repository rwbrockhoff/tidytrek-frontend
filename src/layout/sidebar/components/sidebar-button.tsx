import styled, { css } from 'styled-components';
import { Button } from '@radix-ui/themes';
import { SidebarIcon } from '@/components/ui';

type SidebarButtonProps = {
	onClick: () => void;
	isSidebar: boolean;
};

export const SidebarButton = ({ onClick, isSidebar }: SidebarButtonProps) => {
	return (
		<StyledButton
			$isSidebar={isSidebar}
			onClick={onClick}
			variant="ghost"
			color="gray"
			size="3"
			mt="6">
			<SidebarIcon />
		</StyledButton>
	);
};

const StyledButton = styled(Button)<{ $isSidebar: boolean }>`
	${(props) => !props.$isSidebar && props.theme.mx.mobile(`display: none`)}
	opacity: 0.4;
	background-color: transparent;
	cursor: pointer;
	&:hover {
		filter: brightness(95%);
	}
	${(props) =>
		props.$isSidebar &&
		css`
			color: white;
			position: absolute;
			right: 3em;
			top: 3em;
			opacity: 0.8;
		`};
`;
