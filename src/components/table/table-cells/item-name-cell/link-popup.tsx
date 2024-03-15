import { Popover, TextFieldInput, Button } from '@radix-ui/themes';
import { OnChange } from './item-name-cell';
import styled from 'styled-components';
import { FaLink } from 'react-icons/fa';

type LinkPopupProps = {
	userView: boolean;
	packItemUrl: string;
	displayIcon: boolean;
	onChange: OnChange;
};

export const LinkPopup = (props: LinkPopupProps) => {
	const { userView, packItemUrl, displayIcon, onChange } = props;
	const displayButton = displayIcon || packItemUrl ? true : false;
	if (userView) {
		return (
			<Popover.Root>
				<Popover.Trigger>
					<StyledButton variant="ghost" m="2" $display={displayButton}>
						<LinkIcon $active={packItemUrl ? true : false} />
						{/* <Icon name="linkify" color={packItemUrl ? 'blue' : 'grey'} /> */}
					</StyledButton>
				</Popover.Trigger>
				<Popover.Content style={{ width: 400 }} side="top">
					<TextFieldInput
						color="blue"
						name="packItemUrl"
						value={packItemUrl ?? ''}
						onChange={onChange}
						placeholder="Item link"
					/>
				</Popover.Content>
			</Popover.Root>
		);
	} else return null;
};

const StyledButton = styled(Button)<{ $display: boolean }>`
	opacity: ${({ $display }) => ($display ? 100 : 0)};
	background-color: transparent;
	box-shadow: none;
	cursor: pointer;
	${({ theme: t }) =>
		t.mx.mobile(`
			display: none;
		`)}
`;

const LinkIcon = styled(FaLink)<{ $active: boolean }>`
	color: ${({ $active }) => ($active ? 'var(--cyan-9)' : 'grey')};
`;
