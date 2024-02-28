import {
	Modal,
	ModalContent,
	ModalActions,
	Form,
	FormField,
	Input,
	Icon,
	TextArea,
	FormGroup,
	Divider,
} from 'semantic-ui-react';
import { Button, ModalHeader, Checkbox } from '../../../../shared/ui/SemanticUI';
import { useState, useEffect } from 'react';
import { useEditPackMutation } from '../../../../queries/packQueries';
import { Pack } from '../../../../types/packTypes';
import './PackFormModal.css';
import PackTagProperties from './PackTagProperties/PackTagProperties';
import { cleanUpLink } from '../../../../shared/ui/CustomLinks';
import { InputEvent, TextAreaEvent } from '../../../../shared/formHelpers';
import styled from 'styled-components';
import { SubText } from '../../../../shared/ui/TidyUI';

type PackFormModalProps = {
	pack: Pack;
	open: boolean;
	onClose: () => void;
	onClickDelete: () => void;
};

const mockPhotoUrl =
	'https://images.unsplash.com/photo-1517398825998-780ca786555f?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

const PackFormModal = (props: PackFormModalProps) => {
	const { mutate: editPack } = useEditPackMutation();

	const { pack, open, onClose, onClickDelete } = props;
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

	const handleCheckBox = (updatedCheckbox: {
		packAffiliate?: boolean;
		packPublic?: boolean;
		packPricing?: boolean;
	}) => {
		setModifiedPack((prevFormData) => ({
			...prevFormData,
			...updatedCheckbox,
		}));
		if (!packChanged) {
			setPackChanged(true);
		}
	};

	const handleSubmitPack = () => {
		if (packChanged) {
			const { packId } = props.pack;
			const { packUrl } = modifiedPack;
			const cleanUrl = packUrl ? cleanUpLink(packUrl) : '';
			editPack({ packId, modifiedPack: { ...modifiedPack, packUrl: cleanUrl } });
			onClose();
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

	return (
		// change open={true} -> open={open}
		<Modal size="small" closeIcon open={open} onClose={onClose}>
			<ModalHeader $themeColor="primary">
				{packName ?? pack.packName ?? 'Pack'}
			</ModalHeader>
			<ModalContent>
				<Form style={{ padding: '0 10px' }}>
					<FormSection>
						<LeftPanel>
							<FormField>
								<label>Pack Name</label>
								<Input
									name="packName"
									value={packName ?? ''}
									onChange={handleFormChange}
									placeholder="Pack Name"
								/>
							</FormField>
							<FormField>
								<label>Pack Description</label>
								<TextArea
									name="packDescription"
									value={packDescription ?? ''}
									onChange={handleFormChange}
									placeholder="Pack Description"
								/>
							</FormField>
						</LeftPanel>
						<RightPanel>
							<label style={{ fontWeight: 700, fontSize: '0.95em' }}>Pack Photo</label>
							<SubText>Upload a .jpg or .png file.</SubText>
							<PackPhoto src={mockPhotoUrl} alt="upload custom pack photo" />
						</RightPanel>
					</FormSection>

					<PackTagProperties
						packLocationTag={packLocationTag}
						packDurationTag={packDurationTag}
						packSeasonTag={packSeasonTag}
						packDistanceTag={packDistanceTag}
						handleFormChange={handleFormChange}
					/>

					<FormGroup>
						<FormField width={6}>
							<label>Display Text</label>
							<Input
								name="packUrlName"
								value={packUrlName ?? ''}
								onChange={handleFormChange}
								placeholder="Gear Loadout Video"
							/>
						</FormField>
						<FormField width={10}>
							<label>
								<Icon name="linkify" />
								Link
							</label>
							<Input
								name="packUrl"
								value={packUrl ?? ''}
								onChange={handleFormChange}
								placeholder="Blogpost, Youtube Video, etc."
							/>
						</FormField>
					</FormGroup>

					<Divider style={{ margin: '25px 0px' }} />

					<StyledField width={16}>
						<LabelContainer>
							<label>
								<Icon name="binoculars" /> Public
							</label>
							<SubText>Choose whether you want your pack to be public.</SubText>
						</LabelContainer>
						<Checkbox
							$themeColor="primary"
							toggle
							checked={packPublic}
							onClick={() => handleCheckBox({ packPublic: !packPublic })}
						/>
					</StyledField>

					<StyledField width={16}>
						<LabelContainer>
							<label>
								<Icon name="money" /> Pack Prices
							</label>
							<SubText>Show a price column on your pack to track expenses.</SubText>
						</LabelContainer>
						<Checkbox
							$themeColor="primary"
							toggle
							checked={packPricing}
							onClick={() => handleCheckBox({ packPricing: !packPricing })}
						/>
					</StyledField>

					<StyledField width={16}>
						<LabelContainer>
							<label>
								<Icon name="linkify" /> Affiliate Links
							</label>
							<SubText>
								Enable if you use affiliate links for any of your pack items.
							</SubText>
						</LabelContainer>
						<Checkbox
							$themeColor="primary"
							toggle
							checked={packAffiliate ?? false}
							onClick={() => handleCheckBox({ packAffiliate: !packAffiliate })}
						/>
					</StyledField>

					{packAffiliate && (
						<FormField>
							<label>Custom Affiliate Message</label>
							<TextArea
								name="packAffiliateDescription"
								value={packAffiliateDescription ?? ''}
								onChange={handleFormChange}
								placeholder="You can include your own message. But by default we include the following affiliate message: Using the affiliate links in this pack helps support the creator of this pack at no extra cost to you!"
							/>
						</FormField>
					)}
				</Form>
			</ModalContent>
			<ModalActions>
				<Button color="red" floated="left" basic onClick={onClickDelete}>
					<Icon name="trash" /> Delete Pack
				</Button>
				<Button $themeColor="primary" onClick={handleSubmitPack}>
					<Icon name="save outline" /> Save Pack
				</Button>
			</ModalActions>
		</Modal>
	);
};

export default PackFormModal;

const StyledField = styled(FormField)`
	display: flex;
	align-items: center;
	.checkbox {
		padding-top: 10px;
		margin-left: auto;
	}
`;

const PackPhoto = styled.img`
	width: 100%;
	object-cover: cover;
	border-radius: 15px;
`;

const FormSection = styled.div`
	display: flex;
	margin-bottom: 25px;
`;

const LeftPanel = styled.div`
	width: 50%;
	padding-right: 25px;
	textarea {
		height: 135px;
	}
`;

const RightPanel = styled.div`
	width: 50%;
	padding-left: 10px;
`;

const LabelContainer = styled.div``;
