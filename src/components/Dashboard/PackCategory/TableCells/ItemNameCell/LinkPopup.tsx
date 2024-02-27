import { Input, Popup, Icon, Button } from 'semantic-ui-react';
import { OnChange } from './ItemNameCell';

type LinkPopupProps = {
	userView: boolean;
	packItemUrl: string;
	displayIcon: boolean;
	onChange: OnChange;
};

const LinkPopup = (props: LinkPopupProps) => {
	const { userView, packItemUrl, displayIcon, onChange } = props;
	if (userView) {
		return (
			<Popup
				on="click"
				pinned
				className="url-popup-container"
				trigger={
					<Button
						className="url-icon-button"
						basic
						size="mini"
						style={{
							opacity: displayIcon || packItemUrl ? 100 : 0,
							backgroundColor: 'transparent',
							boxShadow: 'none',
						}}
						icon={<Icon name="linkify" color={packItemUrl ? 'blue' : 'grey'} />}
					/>
				}>
				<Input
					name="packItemUrl"
					value={packItemUrl ?? ''}
					onChange={onChange}
					placeholder="Item link"
					className="url-save-input"
				/>
			</Popup>
		);
	} else return null;
};

export default LinkPopup;
