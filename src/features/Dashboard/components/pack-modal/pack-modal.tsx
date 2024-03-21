import { type InputEvent, type TextAreaEvent } from '@/types/form-types';
import { type Pack } from '@/types/pack-types';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { Form } from '@radix-ui/react-form';
import { FormField } from '@/components/ui';
import { LinkIcon, MoneyIcon, PublicIcon, TrashIcon, cleanUpLink } from '@/components/ui';
import { Button, Dialog, Flex, Separator, Switch, TextArea } from '@radix-ui/themes';
import { SubText } from '@/components/ui/TidyUI';
import { useEditPackMutation } from '@/queries/pack-queries';
import { PackTags } from './pack-tags';
import { PackPhotoPanel } from './pack-photo-panel';

type PackModalProps = {
	children: React.ReactNode;
	pack: Pack;
	onClickDelete: () => void;
};

type Checkboxes = {
	packAffiliate?: boolean;
	packPublic?: boolean;
	packPricing?: boolean;
};

export const PackModal = (props: PackModalProps) => {
	const { mutate: editPack } = useEditPackMutation();

	const { children, pack, onClickDelete } = props;

	const [packChanged, setPackChanged] = useState(false);
	const [modifiedPack, setModifiedPack] = useState({
		packName: '',
		packDescription: '',
		packId: 0,
		userId: 0,
		packIndex: 0,
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
			const cleanUrl = packUrl ? cleanUpLink(packUrl) : '';
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
			<Dialog.Content style={{ maxWidth: '50vw' }}>
				<Dialog.Title mb="4">{packName ?? pack.packName ?? 'Pack'}</Dialog.Title>

				<StyledModalContent>
					<PackPhotoPanel packPhotoUrl={packPhotoUrl} packId={pack.packId} />

					<Form style={{ padding: '0 10px' }}>
						<FormSection>
							<LeftPanel>
								<FormField
									name="packName"
									value={packName ?? ''}
									onChange={handleFormChange}
									label="Pack Name"
									placeholder="Pack Name"
								/>

								<FormField
									name="packDescription"
									value={packDescription ?? ''}
									onChange={handleFormChange}
									label="Pack Description"
									placeholder="Pack Description"
								/>
							</LeftPanel>
						</FormSection>

						<PackTags
							packLocationTag={packLocationTag}
							packDurationTag={packDurationTag}
							packSeasonTag={packSeasonTag}
							packDistanceTag={packDistanceTag}
							handleFormChange={handleFormChange}
						/>

						<div>
							<FormField
								name="packUrlName"
								value={packUrlName ?? ''}
								onChange={handleFormChange}
								label="Display Text"
								placeholder="Gear Loadout Video"
							/>

							<FormField
								name="packUrl"
								value={packUrl ?? ''}
								onChange={handleFormChange}
								label="Link"
								placeholder="Blogpost, Youtube Video, etc."
							/>
						</div>

						<Separator size="4" my="6" />

						<StyledField>
							<div>
								<label>
									<PublicIcon /> Public
								</label>
								<SubText>Choose whether you want your pack to be public.</SubText>
							</div>
							<Switch
								radius="medium"
								color="jade"
								size="3"
								checked={packPublic}
								onClick={() => handleCheckBox({ packPublic: !packPublic })}
							/>
						</StyledField>

						<StyledField>
							<div>
								<label>
									<MoneyIcon /> Pack Prices
								</label>
								<SubText>Show a price column on your pack to track expenses.</SubText>
							</div>
							<Switch
								radius="medium"
								color="jade"
								size="3"
								checked={packPricing}
								onClick={() => handleCheckBox({ packPricing: !packPricing })}
							/>
						</StyledField>

						<StyledField>
							<div>
								<label>
									<LinkIcon /> Affiliate Links
								</label>
								<SubText>
									Enable if you use affiliate links for any of your pack items.
								</SubText>
							</div>
							<Switch
								radius="medium"
								color="jade"
								size="3"
								checked={packAffiliate ?? false}
								onClick={() => handleCheckBox({ packAffiliate: !packAffiliate })}
							/>
						</StyledField>

						{packAffiliate && (
							<div>
								<label>Custom Affiliate Message</label>
								<TextArea
									name="packAffiliateDescription"
									value={packAffiliateDescription ?? ''}
									onChange={handleFormChange}
									placeholder={affiliateMessage}
								/>
							</div>
						)}
					</Form>
				</StyledModalContent>
				<Dialog.Close>
					<Flex justify="end" gap="3" mt="6">
						<Button color="tomato" onClick={onClickDelete}>
							<TrashIcon /> Delete Pack
						</Button>
						<Button onClick={handleSubmitPack}>Save Pack</Button>
					</Flex>
				</Dialog.Close>
			</Dialog.Content>
		</Dialog.Root>
	);
};

const StyledModalContent = styled(Flex)`
	position: relative;
	padding: 1em;
`;
const StyledField = styled(Flex)`
	display: flex;
	align-items: center;
	.checkbox {
		padding-top: 10px;
		margin-left: auto;
	}
`;

const FormSection = styled.div`
	display: flex;
	height: 250px;
	margin-bottom: 25px;
`;

const LeftPanel = styled.div`
	width: 50%;
	padding-right: 25px;
	textarea {
		height: 150px;
	}
`;

// defaults
const affiliateMessage =
	'You can include your own message. But by default we include the following affiliate message: Using the affiliate links in this pack helps support the creator of this pack at no extra cost to you!';
