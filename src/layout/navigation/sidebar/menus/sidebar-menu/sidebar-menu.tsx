import { Link } from 'react-router-dom';
import { Flex } from '@/components/layout';
import { UserIcon, ClosetIcon, BookmarkIcon } from '@/components/icons';
import { StyledMenu } from '../styled-menu/styled-menu';

export const SidebarMenu = () => {
	return (
		<StyledMenu className="gap-1">
			<li>
				<Link to="/profile" viewTransition>
					<Flex className="items-center gap-2 justify-start">
						<UserIcon />
						Profile
					</Flex>
				</Link>
			</li>
			<li>
				<Link to="/gear-closet" viewTransition>
					<Flex className="items-center gap-2 justify-start">
						<ClosetIcon />
						Gear Closet
					</Flex>
				</Link>
			</li>
			<li>
				<Link to="/saved" viewTransition>
					<Flex className="items-center gap-2 justify-start">
						<BookmarkIcon />
						Saved
					</Flex>
				</Link>
			</li>
		</StyledMenu>
	);
};
