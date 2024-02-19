import { Divider, Icon, Input, Popup, PopupContent } from 'semantic-ui-react';
import { Button } from '../../../shared/ui/SemanticUI';
import { useState } from 'react';
import styled from 'styled-components';
import { SocialButton, SocialButtonPicker, socialObject } from './SocialButton';
import { ReactInput } from '../../../types/generalTypes';

type AddLinkProps = {
	addLink: (service: string, socialLink: string) => void;
};

const AddLink = ({ addLink }: AddLinkProps) => {
	const [service, setService] = useState('facebook');
	const [socialLink, setSocialLink] = useState('');

	const handleChangeButton = (socialName: string | undefined) => {
		socialName && setService(socialName);
	};

	const handleAddLink = () => {
		addLink(service, socialLink);
		setService('facebook');
		setSocialLink('');
	};

	const handleInput = (e: ReactInput) => setSocialLink(e.target.value);

	const currentSocial = socialObject[service];

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
							{Object.keys(socialObject).map((key, index) => {
								const item = socialObject[key];
								return (
									<SocialButton key={index} social={item} onClick={handleChangeButton} />
								);
							})}
						</PopupContainer>
					</PopupContent>
				</Popup>

				<Input
					placeholder="Paste your link..."
					value={socialLink}
					onChange={handleInput}
				/>
				<Button $themeColor="primary" disabled={!socialLink} onClick={handleAddLink}>
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
