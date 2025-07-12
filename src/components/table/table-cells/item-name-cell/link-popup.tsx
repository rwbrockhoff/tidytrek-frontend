import { Popover, IconButton, Flex } from '@radix-ui/themes';
import { Button } from '@/components/ui/alpine';
import { TextField } from '@/components/ui/alpine';
import { CheckIcon, SaveIcon, TrashIcon } from '@/components/ui';
import { cleanUpLink } from '@/utils/link-utils';
import { cn, mx } from '@/styles/utils';
import styles from './link-popup.module.css';
import { LinkIcon } from '@/components/ui';
import { useContext, useState } from 'react';
import { type InputEvent } from '@/types/form-types';
import { TableRowContext } from '../../context/table-row-context';
import { useEditPackItemMutation } from '@/queries/pack-queries';
import { useUserContext } from '@/hooks/auth/use-user-context';
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
						<LinkIcon className={hasLink ? styles.linkIconActive : styles.linkIcon} />
					</IconButton>
				</Popover.Trigger>
				<Popover.Content side="top" style={{ minWidth: 400 }}>
					<Flex justify="between" align="center" gap="2" p="1">
						<div className={mx.fullWidth}>
							<TextField.Standalone
								name="packItemUrl"
								value={newPackItemUrl}
								onChange={handleOnChange}
								placeholder="Item link"
							/>
						</div>

						<Button
							onClick={handleSaveLink}
							size="md"
							disabled={!newPackItemUrl.trim()}
							iconLeft={isSuccess ? <CheckIcon /> : <SaveIcon />}>
							{isSuccess ? 'Saved' : 'Save'}
						</Button>
						{packItemUrl && (
							<Button
								variant="danger"
								onClick={handleDeleteLink}
								disabled={!newPackItemUrl.trim()}
								size="md"
								iconLeft={<TrashIcon />}
							/>
						)}
					</Flex>
				</Popover.Content>
			</Popover.Root>
		);
	} else return null;
};
