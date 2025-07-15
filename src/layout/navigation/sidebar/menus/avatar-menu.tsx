import { useNavigate } from 'react-router-dom';
import { UserIcon, LogoutIcon } from '@/components/icons';
import { PopoverMenuItem } from '@/components/ui/popover-menu';

export const AvatarMenu = ({ logout }: { logout: () => void }) => {
	const navigate = useNavigate();

	const handleAccountClick = () => {
		navigate('/account');
	};

	return (
		<>
			<PopoverMenuItem
				icon={<UserIcon />}
				label="Account"
				onClick={handleAccountClick}
			/>
			<PopoverMenuItem
				icon={<LogoutIcon />}
				label="Log Out"
				onClick={logout}
			/>
		</>
	);
};
