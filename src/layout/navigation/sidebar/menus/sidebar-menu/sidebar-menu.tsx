import { Link } from 'react-router-dom';
import { UserIcon, ClosetIcon } from '@/components/icons';
import { StyledMenu } from '../styled-menu/styled-menu';
import styles from '../styled-menu/styled-menu.module.css';

export const SidebarMenu = () => {
	return (
		<StyledMenu className={styles.topMargin}>
			<li>
				<Link to="/profile">
					<UserIcon />
					Profile
				</Link>
			</li>
			<li>
				<Link to="/gear-closet">
					<ClosetIcon />
					Gear Closet
				</Link>
			</li>
		</StyledMenu>
	);
};
