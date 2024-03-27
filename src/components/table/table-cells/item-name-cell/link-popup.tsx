import {
	Popover,
	TextFieldInput,
	IconButton,
	Button,
	Flex,
	TextField,
} from '@radix-ui/themes';
import { CheckIcon, SaveIcon } from '@/components/ui';
import styled from 'styled-components';
import { FaLink } from 'react-icons/fa';
import { useContext, useState } from 'react';
import { type InputEvent } from '@/types/form-types';
import { TableRowContext } from '../../context/table-row-context';
import { useEditPackItemMutation } from '@/queries/pack-queries';
import { useUserContext } from '@/hooks';

type LinkPopupProps = {
	displayIcon: boolean;
};

export const LinkPopup = (props: LinkPopupProps) => {
	const userView = useUserContext();
	const { mutate: editPackItem, isSuccess, reset } = useEditPackItemMutation();

	const { packItem } = useContext(TableRowContext);
	const { packItemUrl } = packItem || {};

	const { displayIcon } = props;
	const [packUrl, setPackUrl] = useState(packItemUrl || '');

	const displayButton = displayIcon || packItemUrl ? true : false;
	const hasLink = packItemUrl !== '' || undefined;

	const handleOnChange = (e: InputEvent) => {
		setPackUrl(e.target.value);
		if (isSuccess) reset();
	};

	const handleOnSave = () => {
		if (packUrl !== packItemUrl && packItem && packItem.packItemId) {
			editPackItem({
				packItemId: packItem.packItemId,
				packItem: { ...packItem, packItemUrl: packUrl },
			});
		}
	};

	if (userView) {
		return (
			<Popover.Root>
				<Popover.Trigger>
					<StyledButton variant="ghost" m="2" $display={displayButton}>
						<StyledLinkIcon $active={packItemUrl ? true : false} />
					</StyledButton>
				</Popover.Trigger>
				<Popover.Content side="top" style={{ minWidth: 400 }}>
					<Flex justify="between">
						<TextField.Root style={{ width: hasLink ? '100%' : '100%' }}>
							<TextFieldInput
								color="jade"
								variant="classic"
								name="packItemUrl"
								value={packUrl}
								onChange={handleOnChange}
								placeholder="Item link"
							/>
						</TextField.Root>

						<Button color="jade" onClick={handleOnSave}>
							{isSuccess ? <CheckIcon /> : <SaveIcon />}
							{isSuccess ? 'Saved' : 'Save'}
						</Button>
					</Flex>
				</Popover.Content>
			</Popover.Root>
		);
	} else return null;
};

const StyledButton = styled(IconButton)<{ $display: boolean }>`
	opacity: ${({ $display }) => ($display ? 100 : 0)};
	background-color: transparent;
	box-shadow: none;
	cursor: pointer;
	${({ theme: t }) =>
		t.mx.mobile(`
			display: none;
		`)}
`;

const StyledLinkIcon = styled(FaLink)<{ $active: boolean }>`
	color: ${({ $active }) => ($active ? 'var(--cyan-9)' : 'grey')};
`;
