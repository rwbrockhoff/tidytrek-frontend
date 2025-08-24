import { Popover } from '@radix-ui/themes';
import { Flex } from '@/components/layout';
import { Button, TextField } from '@/components/alpine';
import { CheckIcon, SaveIcon, TrashIcon, LinkIcon } from '@/components/icons';
import { normalizeURL } from '@/utils/link-utils';
import { cn, mx } from '@/styles/utils';
import styles from './link-popup.module.css';
import hoverStyles from '../hover-styles.module.css';
import { type BaseTableRowItem } from '@/types/pack-types';
import { useEditPackItemMutation } from '@/queries/pack-queries';
import { usePermissions } from '@/hooks/auth/use-permissions';
import { isPackItem } from '@/types/pack-types';
import { requiredUrlSchema } from '@/schemas/common-schemas';
import { useFieldState } from '@/hooks/form/use-field-state';

const validatePackItemUrl = (url: string) => {
	if (!url.trim()) return false;
	requiredUrlSchema.parse(url);
	return true;
};

type LinkPopupProps = {
	packItem: BaseTableRowItem;
};

export const LinkPopup = (props: LinkPopupProps) => {
	const { isCreator } = usePermissions();

	const { mutate: editPackItem, isSuccess, isPending, reset } = useEditPackItemMutation();

	const { packItem } = props;
	const { packItemUrl } = packItem || {};

	const {
		value: newPackItemUrl,
		validationError,
		apiError,
		handleChange,
		validate,
		setApiErrorFromResponse,
		setValue,
		clearErrors,
	} = useFieldState({
		initialValue: packItemUrl || '',
		validator: validatePackItemUrl,
		resetOnSuccess: reset,
	});

	const handleSaveLink = () => {
		const isValid = validate(newPackItemUrl);

		if (isValid && newPackItemUrl !== packItemUrl && packItem && packItem.packItemId) {
			const cleanUrl = normalizeURL(newPackItemUrl);
			if (isPackItem(packItem)) {
				editPackItem(
					{
						packItemId: packItem.packItemId,
						packItem: { ...packItem, packItemUrl: cleanUrl },
					},
					{
						onError: (error) => {
							setApiErrorFromResponse(error);
						},
					},
				);
			}
		}
	};

	const handleDeleteLink = () => {
		if (packItem && isPackItem(packItem)) {
			editPackItem({
				packItemId: packItem.packItemId,
				packItem: { ...packItem, packItemUrl: '' },
			});
			setValue('');
			clearErrors();
			reset();
		}
	};

	if (!isCreator) return null;

	// Show validation/API error in TextField error (keeps UI minimal for popup)
	const displayError = validationError || apiError;

	const hasUrl = !!packItemUrl;

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
						hasUrl ? styles.linkButtonVisible : hoverStyles.showOnHover,
					)}
					iconLeft={
						<LinkIcon className={cn(hasUrl ? styles.linkIconActive : styles.linkIcon)} />
					}
				/>
			</Popover.Trigger>
			<Popover.Content side="top" style={{ minWidth: 400 }}>
				<Flex className="items-start gap-2 p-1">
					<div className="w-full">
						<TextField.Standalone
							name="packItemUrl"
							value={newPackItemUrl}
							onChange={handleChange}
							placeholder="Item link"
							error={displayError}
							collapsibleError
						/>
					</div>

					<Button
						onClick={handleSaveLink}
						disabled={!newPackItemUrl.trim() || isPending}
						iconLeft={isSuccess ? <CheckIcon /> : <SaveIcon />}>
						{isSuccess ? 'Saved' : 'Save'}
					</Button>
					{packItemUrl && (
						<Button
							color="danger"
							onClick={handleDeleteLink}
							disabled={!newPackItemUrl.trim()}
							iconLeft={<TrashIcon />}
							className={styles.deleteButton}
						/>
					)}
				</Flex>
			</Popover.Content>
		</Popover.Root>
	);
};
