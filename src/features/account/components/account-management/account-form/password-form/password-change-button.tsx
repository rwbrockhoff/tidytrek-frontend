import { Button } from '@/components/alpine';
import { PasswordIcon } from '@/components/icons';
import { FormSection } from '@/features/account/types';

type PasswordChangeButtonProps = {
	onChangeSection: (section: FormSection) => void;
};

export const PasswordChangeButton = ({ onChangeSection }: PasswordChangeButtonProps) => {
	return (
		<Button
			variant="outline"
			onClick={() => onChangeSection(FormSection.CONFIRMATION)}
			iconLeft={<PasswordIcon />}
			override
			className="outline-button-dark">
			Change Password
		</Button>
	);
};
