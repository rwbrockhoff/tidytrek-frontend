import {
	Popover,
	TextFieldInput,
	IconButton,
	Button,
	Flex,
	TextField,
} from '@radix-ui/themes';
import { ShareIcon } from '@/components/ui';
import { OnChange } from './item-name-cell';
import styled from 'styled-components';
import { FaLink } from 'react-icons/fa';
import { Link } from '@/components/ui';

type LinkPopupProps = {
	userView: boolean;
	packItemUrl: string;
	displayIcon: boolean;
	onChange: OnChange;
};

export const LinkPopup = (props: LinkPopupProps) => {
	const { userView, packItemUrl, displayIcon, onChange } = props;
	const displayButton = displayIcon || packItemUrl ? true : false;
	const hasLink = packItemUrl !== '' || undefined;
	if (userView) {
		return (
			<Popover.Root>
				<Popover.Trigger>
					<StyledButton variant="ghost" m="2" $display={displayButton}>
						<StyledLinkIcon $active={packItemUrl ? true : false} />
					</StyledButton>
				</Popover.Trigger>
				<Popover.Content side="top" style={{ minWidth: 400 }}>
					<Flex justify="between">
						<TextField.Root style={{ width: hasLink ? '70%' : '100%' }}>
							<TextFieldInput
								color="jade"
								variant="classic"
								name="packItemUrl"
								value={packItemUrl ?? ''}
								onChange={onChange}
								placeholder="Item link"
							/>
						</TextField.Root>
						{packItemUrl && (
							<Link link={packItemUrl} externalLink>
								<Button color="jade">
									<ShareIcon />
									Visit Link
								</Button>
							</Link>
						)}
					</Flex>
				</Popover.Content>
			</Popover.Root>
		);
	} else return null;
};

const StyledButton = styled(IconButton)<{ $display: boolean }>`
	opacity: ${({ $display }) => ($display ? 100 : 0)};
	background-color: transparent;
	box-shadow: none;
	cursor: pointer;
	${({ theme: t }) =>
		t.mx.mobile(`
			display: none;
		`)}
`;

const StyledLinkIcon = styled(FaLink)<{ $active: boolean }>`
	color: ${({ $active }) => ($active ? 'var(--cyan-9)' : 'grey')};
`;
