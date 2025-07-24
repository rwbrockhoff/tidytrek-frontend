import { Button } from '@/components/alpine';
import { PasswordIcon } from '@/components/icons';
import { type FormSection, FORM_SECTIONS } from '@/features/account/types';

type PasswordChangeButtonProps = {
	onChangeSection: (section: FormSection) => void;
};

export const PasswordChangeButton = ({ onChangeSection }: PasswordChangeButtonProps) => {
	return (
		<Button
			variant="outline"
			onClick={() => onChangeSection(FORM_SECTIONS.CONFIRMATION)}
			iconLeft={<PasswordIcon />}
			override
			className="outline-button-dark">
			Change Password
		</Button>
	);
};
