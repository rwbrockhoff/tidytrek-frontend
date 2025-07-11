import { Button } from '@radix-ui/themes';
import { PasswordIcon } from '@/components/ui';
import { type FormSection, FORM_SECTIONS } from '@/features/account/types';

type PasswordChangeButtonProps = {
	onChangeSection: (section: FormSection) => void;
};

export const PasswordChangeButton = ({ onChangeSection }: PasswordChangeButtonProps) => {
	return (
		<Button
			variant="outline"
			color="gray"
			onClick={() => onChangeSection(FORM_SECTIONS.CONFIRMATION)}>
			<PasswordIcon size={16} />
			Change Password
		</Button>
	);
};