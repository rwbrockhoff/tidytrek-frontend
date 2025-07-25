import { type InputEvent, type TextAreaEvent } from '@/types/form-types';
import { type Pack } from '@/types/pack-types';
import styles from './pack-modal.module.css';
import { mx } from '@/styles/utils';
import { useState, useEffect } from 'react';
import { cn } from '@/styles/utils/cn';
import { Form } from '@radix-ui/react-form';
import { SaveIcon } from '@/components/ui';
import { TextArea } from '@/components/ui/alpine/';
import { TextField } from '@/components/ui/alpine';
import { LinkIcon, MoneyIcon, PublicIcon, TrashIcon, cleanUpLink } from '@/components/ui';
import { Button, Dialog, Flex, Separator, Switch, Text } from '@radix-ui/themes';
import { useEditPackMutation } from '@/queries/pack-queries';
import { PackTags } from './pack-tags';
import { PackPhotoPanel } from './pack-photo-panel';

type PackModalProps = {
	children: React.ReactNode;
	pack: Pack;
	showDeleteModal: () => void;
};

type Checkboxes = {
	packAffiliate?: boolean;
	packPublic?: boolean;
	packPricing?: boolean;
};

export const PackModal = (props: PackModalProps) => {
	const { mutate: editPack } = useEditPackMutation();

	const { children, pack, showDeleteModal } = props;

	const [packChanged, setPackChanged] = useState(false);
	const [modifiedPack, setModifiedPack] = useState({
		packName: '',
		packDescription: '',
		packId: 0,
		userId: 0,
		packIndex: '0',
		packLocationTag: '',
		packSeasonTag: '',
		packDurationTag: '',
		packDistanceTag: '',
		packPublic: false,
		packUrlName: '',
		packUrl: '',
		packAffiliate: false,
		packAffiliateDescription: '',
		packViews: 0,
		packBookmarkCount: 0,
		packPricing: false,
		packPhotoUrl: '',
	});

	useEffect(() => {
		setModifiedPack({
			...props.pack,
		});
	}, [props.pack]);

	const handleFormChange = (e: InputEvent | TextAreaEvent) => {
		setModifiedPack((prevFormData) => ({
			...prevFormData,
			[e?.target?.name]: e?.target?.value,
		}));
		if (!packChanged) setPackChanged(true);
	};

	const handleCheckBox = (updatedCheckbox: Checkboxes) => {
		setModifiedPack((prev) => ({
			...prev,
			...updatedCheckbox,
		}));
		if (!packChanged) setPackChanged(true);
	};

	const handleSubmitPack = () => {
		if (packChanged) {
			const { packId } = props.pack;
			const { packUrl } = modifiedPack;
			const cleanUrl = cleanUpLink(packUrl);
			editPack({ packId, modifiedPack: { ...modifiedPack, packUrl: cleanUrl } });
		}
	};

	const {
		packPublic,
		packName,
		packDescription,
		packLocationTag,
		packSeasonTag,
		packDurationTag,
		packDistanceTag,
		packUrl,
		packUrlName,
		packAffiliate,
		packAffiliateDescription,
		packPricing,
	} = modifiedPack;

	const { packPhotoUrl } = pack;

	return (
		<Dialog.Root>
			<Dialog.Trigger>
				<div>{children}</div>
			</Dialog.Trigger>
			<Dialog.Content style={{ maxWidth: '700px' }}>
				<Dialog.Title mt="2" mb="1" ml="4">
					{packName ?? pack.packName ?? 'Pack'}
				</Dialog.Title>
				<Dialog.Description size="2" color="gray" mb="4" ml="4">
					Edit pack details, settings, and photo
				</Dialog.Description>

				<Flex className={styles.modalContent}>
					<PackPhotoPanel packPhotoUrl={packPhotoUrl} packId={pack.packId} />

					<Form style={{ width: '100%' }}>
						<Flex
							direction="column"
							className={cn(styles.leftPanel, mx.responsiveContent)}>
							<TextField.Input
								name="packName"
								value={packName ?? ''}
								onChange={handleFormChange}
								label="Pack Name"
								placeholder="Pack Name"
								width="100%"
							/>
							<TextArea.Input
								name="packDescription"
								value={packDescription ?? ''}
								label="Pack Description"
								placeholder="Pack Description"
								onChange={handleFormChange}
							/>
						</Flex>

						<PackTags
							packLocationTag={packLocationTag}
							packDurationTag={packDurationTag}
							packSeasonTag={packSeasonTag}
							packDistanceTag={packDistanceTag}
							handleFormChange={handleFormChange}
						/>

						<Flex justify="between">
							<TextField.Input
								name="packUrlName"
								value={packUrlName ?? ''}
								onChange={handleFormChange}
								label="Display Text"
								placeholder="Gear Loadout Video"
								width="30%"
							/>

							<TextField.Input
								name="packUrl"
								value={packUrl ?? ''}
								onChange={handleFormChange}
								label="Link"
								placeholder="Blogpost, Youtube Video, etc."
								width="67%"
							/>
						</Flex>

						<Separator size="4" my="4" />

						<Flex align="center" my="4">
							<Flex justify="center" direction="column">
								<label>
									<PublicIcon /> Public
								</label>
								<Text size="2" color="gray">
									Choose whether you want your pack to be public.
								</Text>
							</Flex>
							<Switch
								radius="medium"
								color="jade"
								size="3"
								ml="auto"
								checked={packPublic}
								onClick={() => handleCheckBox({ packPublic: !packPublic })}
							/>
						</Flex>

						<Flex align="center" my="4">
							<Flex justify="center" direction="column">
								<label>
									<MoneyIcon /> Pack Prices
								</label>
								<Text size="2" color="gray">
									Show a price column on your pack to track expenses.
								</Text>
							</Flex>
							<Switch
								radius="medium"
								color="jade"
								size="3"
								ml="auto"
								checked={packPricing}
								onClick={() => handleCheckBox({ packPricing: !packPricing })}
							/>
						</Flex>

						<Flex align="center" my="4">
							<Flex justify="center" direction="column">
								<label>
									<LinkIcon /> Affiliate Links
								</label>
								<Text size="2" color="gray">
									Enable if you use affiliate links for any of your pack items.
								</Text>
							</Flex>
							<Switch
								radius="medium"
								color="jade"
								size="3"
								ml="auto"
								checked={packAffiliate ?? false}
								onClick={() => handleCheckBox({ packAffiliate: !packAffiliate })}
							/>
						</Flex>

						{packAffiliate && (
							<TextArea.Input
								name="packAffiliateDescription"
								value={packAffiliateDescription ?? ''}
								onChange={handleFormChange}
								placeholder={affiliateMessage}
								label="Custom Affiliate Message"
							/>
						)}
					</Form>
				</Flex>
				<Dialog.Close>
					<Flex justify="end" gap="3" mt="2">
						<Button color="tomato" onClick={showDeleteModal}>
							<TrashIcon /> Delete Pack
						</Button>

						<Button onClick={handleSubmitPack}>
							<SaveIcon />
							Save Pack
						</Button>
					</Flex>
				</Dialog.Close>
			</Dialog.Content>
		</Dialog.Root>
	);
};

// defaults
const affiliateMessage =
	'You can include your own message. But by default we include the following affiliate message: Using the affiliate links in this pack helps support the creator of this pack at no extra cost to you!';
