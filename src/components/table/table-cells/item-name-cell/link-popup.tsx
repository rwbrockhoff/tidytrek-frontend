import { Popover, TextFieldInput, IconButton, Button, Flex } from '@radix-ui/themes';
import { CheckIcon, SaveIcon, TrashIcon, cleanUpLink } from '@/components/ui';
import { cn, mx } from '@/styles/utils';
import styles from './link-popup.module.css';
import { FaLink } from 'react-icons/fa';
import { useContext, useState } from 'react';
import { type InputEvent } from '@/types/form-types';
import { TableRowContext } from '../../context/table-row-context';
import { useEditPackItemMutation } from '@/queries/pack-queries';
import { useUserContext } from '@/hooks';
import { isPackItem } from '@/types/pack-types';

type LinkPopupProps = {
	displayIcon: boolean;
};

export const LinkPopup = (props: LinkPopupProps) => {
	const userView = useUserContext();
	const { mutate: editPackItem, isSuccess, reset } = useEditPackItemMutation();

	const { packItem } = useContext(TableRowContext);
	const { packItemUrl } = packItem || {};

	const { displayIcon } = props;
	const [newPackItemUrl, setPackUrl] = useState(packItemUrl || '');

	const displayButton = displayIcon || packItemUrl ? true : false;
	const hasLink = packItemUrl !== '' || undefined;

	const handleOnChange = (e: InputEvent) => {
		setPackUrl(e.target.value);
		if (isSuccess) reset();
	};

	const handleSaveLink = () => {
		if (newPackItemUrl !== packItemUrl && packItem && packItem.packItemId) {
			const cleanUrl = cleanUpLink(newPackItemUrl);
			// Only edit if this is a pack item
			if (isPackItem(packItem)) {
				editPackItem({
					packItemId: packItem.packItemId,
					packItem: { ...packItem, packItemUrl: cleanUrl },
				});
			}
		}
	};

	const handleDeleteLink = () => {
		if (packItem && isPackItem(packItem)) {
			editPackItem({
				packItemId: packItem.packItemId,
				packItem: { ...packItem, packItemUrl: '' },
			});
			setPackUrl('');
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
							mx.mobileHidden,
							displayButton ? styles.linkButtonVisible : styles.linkButtonHidden,
						)}>
						<FaLink className={hasLink ? styles.linkIconActive : styles.linkIcon} />
					</IconButton>
				</Popover.Trigger>
				<Popover.Content side="top" style={{ minWidth: 400 }}>
					<Flex justify="between" gap="2" p="1">
						<div className={mx.fullWidth}>
							<TextFieldInput
								name="packItemUrl"
								value={newPackItemUrl}
								onChange={handleOnChange}
								placeholder="Item link"
								radius="small"
							/>
						</div>

						<Button onClick={handleSaveLink} disabled={!newPackItemUrl.trim()}>
							{isSuccess ? <CheckIcon /> : <SaveIcon />}
							{isSuccess ? 'Saved' : 'Save'}
						</Button>
						{packItemUrl && (
							<Button
								color="red"
								onClick={handleDeleteLink}
								disabled={!newPackItemUrl.trim()}>
								<TrashIcon />
							</Button>
						)}
					</Flex>
				</Popover.Content>
			</Popover.Root>
		);
	} else return null;
};
