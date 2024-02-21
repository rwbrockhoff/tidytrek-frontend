import { Divider, Icon, Input, Popup, PopupContent } from 'semantic-ui-react';
import { Button } from '../../../shared/ui/SemanticUI';
import { useState } from 'react';
import styled from 'styled-components';
import { SocialButton, SocialButtonPicker } from './SocialButton';
import socialMediaUI from '../../../shared/ui/SocialMediaUI';
import { ReactInput } from '../../../types/generalTypes';
import { useHandlers } from '../../../views/Account/ProfileSettings/useHandlers';

const AddLink = () => {
	const { addSocialLink } = useHandlers().handlers;
	const {
		addSocialLink: { isPending },
	} = useHandlers().mutations;

	const [service, setService] = useState('facebook');
	const [socialLink, setSocialLink] = useState('');

	const handleChangeButton = (socialName: string | undefined) => {
		socialName && setService(socialName);
	};

	const handleAddLink = () => {
		addSocialLink(service, socialLink);
		setService('facebook');
		setSocialLink('');
	};

	const handleUpdateService = () => {
		//update social service icon based on URL
		const [socialService] = Object.keys(socialMediaUI).filter((social) =>
			socialLink.includes(social),
		);
		if (socialService === service) return;
		if (socialService && socialService !== service) return setService(socialService);
		if (service !== 'custom') setService('custom');
	};

	const handleInput = (e: ReactInput) => setSocialLink(e.target.value);

	const currentSocial = socialMediaUI[service];

	return (
		<>
			<Divider style={{ marginBottom: 25 }} />
			<SocialLinksContainer>
				<Popup
					on="click"
					trigger={
						<div>
							<SocialButtonPicker currentSocial={currentSocial} />
						</div>
					}>
					<PopupContent>
						<PopupContainer>
							{Object.keys(socialMediaUI).map((key, index) => {
								const { socialName, color, icon } = socialMediaUI[key];
								return (
									<SocialButton
										key={index}
										socialName={socialName}
										color={color}
										icon={icon}
										onClick={handleChangeButton}
									/>
								);
							})}
						</PopupContainer>
					</PopupContent>
				</Popup>

				<Input
					onBlur={handleUpdateService}
					placeholder="Paste your link..."
					value={socialLink}
					onChange={handleInput}
				/>
				<Button
					$themeColor="primary"
					disabled={!socialLink || isPending}
					onClick={handleAddLink}>
					<Icon name="add" />
					Add Link
				</Button>
			</SocialLinksContainer>
		</>
	);
};

export default AddLink;

const SocialLinksContainer = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 25px;
	&&& {
		input {
			margin: 5px 5px;
		}
		button {
			margin: 5px 5px;
		}
	}
`;

const PopupContainer = styled.div`
	width: 40vw;
	&&& {
		div.ui.label {
			margin: 10px;
		}
	}
`;
