import {
	Popover,
	TextFieldInput,
	IconButton,
	Button,
	Flex,
	TextField,
} from '@radix-ui/themes';
import { CheckIcon, SaveIcon, cleanUpLink } from '@/components/ui';
import { cn, mixins } from '@/styles/utils';
import styles from './link-popup.module.css';
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
	const [newPackUrl, setPackUrl] = useState(packItemUrl || '');

	const displayButton = displayIcon || packItemUrl ? true : false;
	const hasLink = packItemUrl !== '' || undefined;

	const handleOnChange = (e: InputEvent) => {
		setPackUrl(e.target.value);
		if (isSuccess) reset();
	};

	const handleOnSave = () => {
		if (newPackUrl !== packItemUrl && packItem && packItem.packItemId) {
			const cleanUrl = cleanUpLink(newPackUrl);
			editPackItem({
				packItemId: packItem.packItemId,
				packItem: { ...packItem, packItemUrl: cleanUrl },
			});
		}
	};

	if (userView) {
		return (
			<Popover.Root>
				<Popover.Trigger>
					<IconButton 
						variant="ghost" 
						m="2" 
						className={cn(
							styles.linkButton,
							mixins.mobileHidden,
							displayButton ? styles.linkButtonVisible : styles.linkButtonHidden
						)}
					>
						<FaLink className={hasLink ? styles.linkIconActive : styles.linkIcon} />
					</IconButton>
				</Popover.Trigger>
				<Popover.Content side="top" style={{ minWidth: 400 }}>
					<Flex justify="between">
						<TextField.Root style={{ width: '100%' }}>
							<TextFieldInput
								color="jade"
								variant="classic"
								name="packItemUrl"
								value={newPackUrl}
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

