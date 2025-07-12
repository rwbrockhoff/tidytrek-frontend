import { Button } from '@/components/ui/alpine';
import { PasswordIcon } from '@/components/ui';
import { type FormSection, FORM_SECTIONS } from '@/features/account/types';

type PasswordChangeButtonProps = {
	onChangeSection: (section: FormSection) => void;
};

export const PasswordChangeButton = ({ onChangeSection }: PasswordChangeButtonProps) => {
	return (
		<Button
			variant="outline"
			onClick={() => onChangeSection(FORM_SECTIONS.CONFIRMATION)}
			iconLeft={<PasswordIcon size={16} />}>
			Change Password
		</Button>
	);
};