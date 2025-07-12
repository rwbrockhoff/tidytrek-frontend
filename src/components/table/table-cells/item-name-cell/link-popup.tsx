import { Popover, Flex } from '@radix-ui/themes';
import { Button } from '@/components/ui/alpine';
import { TextField } from '@/components/ui/alpine';
import { CheckIcon, SaveIcon, TrashIcon } from '@/components/ui';
import { normalizeURL } from '@/utils/link-utils';
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
			const cleanUrl = normalizeURL(newPackItemUrl);
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
					<Button
						variant="ghost"
						size="lg"
						override
						className={cn(
							styles.linkButton,
							mx.mobileHidden,
							displayButton ? styles.linkButtonVisible : styles.linkButtonHidden,
						)}
						iconLeft={
							<LinkIcon
								className={cn(hasLink ? styles.linkIconActive : styles.linkIcon)}
							/>
						}
					/>
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
							disabled={!newPackItemUrl.trim()}
							iconLeft={isSuccess ? <CheckIcon /> : <SaveIcon />}>
							{isSuccess ? 'Saved' : 'Save'}
						</Button>
						{packItemUrl && (
							<Button
								variant="danger"
								onClick={handleDeleteLink}
								disabled={!newPackItemUrl.trim()}
								iconLeft={<TrashIcon />}
							/>
						)}
					</Flex>
				</Popover.Content>
			</Popover.Root>
		);
	} else return null;
};
