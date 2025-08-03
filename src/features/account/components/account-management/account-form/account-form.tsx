import { type User } from '@/types/user-types';
import { FormSection } from '@/features/account/types';
import { useState } from 'react';
import { SegmentGroup } from '@/components/primitives';
import { PasswordForm } from './password-form/password-form';
import { AccountInfoDisplay } from '../account-info-display';
import { DeleteAccountSection } from '../delete-account-section';
import { UserPreferencesSection } from '../user-preferences-section';

type AccountFormProps = {
	user: User | null;
	deleteAccount: () => void;
};

export const AccountForm = (props: AccountFormProps) => {
	const { user, deleteAccount } = props;

	const [displayFormSection, setDisplayFormSection] = useState<FormSection>(
		FormSection.INITIAL,
	);

	const handleChangeFormSection = (section: FormSection) =>
		setDisplayFormSection(section);

	return (
		<SegmentGroup>
			<AccountInfoDisplay user={user} />
			<UserPreferencesSection />
			<PasswordForm
				displayFormSection={displayFormSection}
				changeFormSection={handleChangeFormSection}
			/>
			<DeleteAccountSection onDeleteAccount={deleteAccount} />
		</SegmentGroup>
	);
};
