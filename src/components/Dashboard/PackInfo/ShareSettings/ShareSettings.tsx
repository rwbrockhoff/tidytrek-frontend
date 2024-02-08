import {
	Icon,
	Popup,
	PopupContent,
	Header,
	Divider,
	Input,
	Button,
} from 'semantic-ui-react';
import { useState } from 'react';
import { useUserContext } from '../../../../views/Dashboard/useUserContext';
import './ShareSettings.css';

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
			<div className="share-settings-container">
				<p>
					<Icon name="binoculars" /> Public
				</p>
				<Popup
					on="click"
					flowing
					hideOnScroll
					onClose={handleReset}
					trigger={
						<p className="share-button">
							<Icon name="share alternate" />
							Share Pack
						</p>
					}>
					<PopupContent>
						<Header as="h4">Share Your Pack</Header>
						<Divider />
						<div className="share-settings-popup-container">
							<Input size="mini" value={packLink} />
							<Button
								size="mini"
								attached="right"
								toggle
								active={linkCopied}
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
			</div>
		);
	} else {
		return (
			<p className="share-settings-text">
				<Icon name="hide" /> Private
			</p>
		);
	}
};

export default ShareSettings;
