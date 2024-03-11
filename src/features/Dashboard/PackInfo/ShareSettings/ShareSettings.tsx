import { Icon, Popup, PopupContent, Header, Divider, Input } from 'semantic-ui-react';
import styled from 'styled-components';
import { themeColor } from '../../../../styles/mixins';
import { Button } from '../../../../components/ui/SemanticUI';
import { useState } from 'react';
import { useUserContext } from '../../hooks/useViewerContext';

type ShareSettingsProps = { packPublic: boolean; packId: string | undefined };

const ShareSettings = ({ packPublic, packId }: ShareSettingsProps) => {
	const userView = useUserContext();
	const packLink = `https://tidytrek.co/pk/${packId}`;
	const [linkCopied, setLinkCopied] = useState(false);

	const handleCopyToClipboard = () => {
		navigator.clipboard.writeText(packLink);
		setLinkCopied(true);
	};

	const handleReset = () => setLinkCopied(false);

	if (!userView) return null;

	if (packPublic) {
		return (
			<ShareSettingsContainer>
				<LightText>
					<Icon name="binoculars" /> Public
				</LightText>
				<Popup
					on="click"
					flowing
					hideOnScroll
					onClose={handleReset}
					trigger={
						<ShareText>
							<Icon name="share alternate" />
							Share Pack
						</ShareText>
					}>
					<PopupContent>
						<Header as="h4">Share Your Pack</Header>
						<Divider />
						<div>
							<Input size="mini" value={packLink} />
							<Button
								$themeColor="primary"
								size="mini"
								attached="right"
								toggle
								onClick={handleCopyToClipboard}>
								{linkCopied ? (
									<>
										<Icon name="check" />
										Copied
									</>
								) : (
									<>
										<Icon name="share alternate" />
										Copy Link
									</>
								)}
							</Button>
						</div>
					</PopupContent>
				</Popup>
			</ShareSettingsContainer>
		);
	} else {
		return (
			<LightText>
				<Icon name="hide" /> Private
			</LightText>
		);
	}
};

export default ShareSettings;

const ShareSettingsContainer = styled.div`
	display: flex;
`;

const LightText = styled.p`
	opacity: 0.4;
`;

const ShareText = styled(LightText)`
	margin-left: 15px;
	cursor: pointer;
	&:hover {
		opacity: 1;
		${themeColor('primary')}
	}
`;
