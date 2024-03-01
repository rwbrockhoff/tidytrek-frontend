import { Input, Popup, Icon, Button } from 'semantic-ui-react';
import { OnChange } from './ItemNameCell';
import styled from 'styled-components';

type LinkPopupProps = {
	userView: boolean;
	packItemUrl: string;
	displayIcon: boolean;
	onChange: OnChange;
};

const LinkPopup = (props: LinkPopupProps) => {
	const { userView, packItemUrl, displayIcon, onChange } = props;
	const displayButton = displayIcon || packItemUrl ? true : false;
	if (userView) {
		return (
			<StyledPopup
				on="click"
				trigger={
					<div>
						<StyledButton
							basic
							size="mini"
							$display={displayButton}
							icon={<Icon name="linkify" color={packItemUrl ? 'blue' : 'grey'} />}
						/>
					</div>
				}>
				<Input
					name="packItemUrl"
					value={packItemUrl ?? ''}
					onChange={onChange}
					placeholder="Item link"
				/>
			</StyledPopup>
		);
	} else return null;
};

export default LinkPopup;

const StyledPopup = styled(Popup)`
	max-width: fit-content;
	input {
		width: 400px;
	}
	${({ theme: t }) =>
		t.mx.mobile(`
		display: none;
	`)}
`;

const StyledButton = styled(Button)<{ $display: boolean }>`
	&&&& {
		opacity: ${({ $display }) => ($display ? 100 : 0)};
		background-color: transparent;
		box-shadow: none;
		${({ theme: t }) =>
			t.mx.mobile(`
			display: none;
		`)}
	}
`;
