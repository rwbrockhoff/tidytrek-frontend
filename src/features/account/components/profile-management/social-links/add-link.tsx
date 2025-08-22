import { Flex, Stack } from '@/components/layout';
import { Alert, Button, TextField } from '@/components/alpine';
import { PlusIcon, LinkIcon } from '@/components/icons';
import { useAddSocialLinkMutation } from '@/queries/profile-settings-queries';
import { normalizeURL } from '@/utils';
import { requiredUrlSchema } from '@/schemas/common-schemas';
import { useFieldState } from '@/hooks/form/use-field-state';
import styles from './add-link.module.css';
import { cn } from '@/styles/utils';

const validateSocialLink = (url: string) => {
	if (!url.trim()) return false;
	requiredUrlSchema.parse(url);
	return true;
};

export const AddLink = ({ socialLinksCount }: { socialLinksCount: number }) => {
	const { mutate: addSocialLink, isPending } = useAddSocialLinkMutation();

	const {
		value: socialLink,
		validationError: urlError,
		apiError: linkError,
		handleChange,
		validate,
		setApiErrorFromResponse,
		reset,
	} = useFieldState({
		initialValue: '',
		validator: validateSocialLink,
	});

	const hasMaxLinks = socialLinksCount >= 4;

	const handleAddLink = () => {
		if (hasMaxLinks) return;

		const isValid = validate(socialLink);

		if (isValid) {
			const cleanURL = normalizeURL(socialLink);
			addSocialLink(cleanURL, {
				onSuccess: () => {
					reset();
				},
				onError: (error) => {
					setApiErrorFromResponse(error);
				},
			});
		}
	};

	return (
		<Stack className="gap-4">
			<Flex className="flex-col gap-4 mt-8 md:flex-row md:items-start">
				<div className="w-full md:w-80">
					<TextField.Standalone
						placeholder="Paste your link..."
						value={socialLink}
						onChange={handleChange}
						error={urlError}
					/>
				</div>
				<div className="w-auto">
					<Button
						disabled={!socialLink || isPending || hasMaxLinks}
						onClick={handleAddLink}>
						<PlusIcon />
						Add Link
					</Button>
				</div>
			</Flex>

			{hasMaxLinks && (
				<Flex className={cn(styles.maxLinksMessage, 'items-center py-2 gap-1')}>
					<LinkIcon />
					You currently have the max of 4 links.
				</Flex>
			)}
			{linkError && !hasMaxLinks && (
				<div className="w-full md:max-w-md mt-2">
					<Alert variant="error" size="sm">
						{linkError.message}
					</Alert>
				</div>
			)}
		</Stack>
	);
};
