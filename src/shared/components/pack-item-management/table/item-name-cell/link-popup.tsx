import { Popover } from '@radix-ui/themes';
import { Flex } from '@/components/layout';
import { Button, TextField } from '@/components/alpine';
import { SaveIcon, TrashIcon, LinkIcon } from '@/components/icons';
import { cn, mx } from '@/styles/utils';
import styles from './link-popup.module.css';
import hoverStyles from '../hover-styles.module.css';
import { type InputEvent } from '@/types/form-types';
import { usePermissions } from '@/hooks/auth/use-permissions';
import { normalizeURL } from '@/utils/link-utils';
import { useFieldState } from '@/hooks/form/use-field-state';
import { requiredUrlSchema } from '@/schemas/common-schemas';

const validatePackItemUrl = (url: string) => {
	if (!url.trim()) return false;
	requiredUrlSchema.parse(url);
	return true;
};

type LinkPopupProps = {
	packItemUrl?: string;
	onChange: (e: InputEvent) => void;
};

export const LinkPopup = (props: LinkPopupProps) => {
	const { isCreator } = usePermissions();
	const { packItemUrl, onChange } = props;

	const {
		value: newPackItemUrl,
		validationError,
		handleChange,
		validate,
		setValue,
	} = useFieldState({
		initialValue: packItemUrl || '',
		validator: validatePackItemUrl,
	});


	const handleSaveLink = () => {
		const isValid = validate(newPackItemUrl);
		if (isValid && newPackItemUrl !== packItemUrl) {
			const cleanUrl = normalizeURL(newPackItemUrl);
			const event = {
				target: { name: 'packItemUrl', value: cleanUrl },
			} as InputEvent;
			onChange(event);
		}
	};

	const handleDeleteLink = () => {
		const event = {
			target: { name: 'packItemUrl', value: '' },
		} as InputEvent;
		onChange(event);
		setValue('');
	};

	const hasUrl = !!(packItemUrl && packItemUrl.trim() && packItemUrl !== 'null');

	if (!isCreator) return null;

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
							error={validationError}
							collapsibleError
						/>
					</div>

					<Button
						onClick={handleSaveLink}
						disabled={!newPackItemUrl.trim()}
						iconLeft={<SaveIcon />}>
						Save
					</Button>
					{hasUrl && (
						<Button
							color="danger"
							onClick={handleDeleteLink}
							disabled={!packItemUrl?.trim()}
							iconLeft={<TrashIcon />}
							className={styles.deleteButton}
						/>
					)}
				</Flex>
			</Popover.Content>
		</Popover.Root>
	);
};
