import { type User } from '@/types/user-types';
import { type FormSection } from '@/features/account/types';
import { useState } from 'react';
import { Stack } from '@/components/layout';
import { Segment, SegmentGroup } from '@/components/primitives';
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

	const [displayFormSection, setDisplayFormSection] = useState<FormSection>('initial');

	const handleChangeFormSection = (section: FormSection) =>
		setDisplayFormSection(section);

	return (
		<Stack>
			<SegmentGroup>
				<AccountInfoDisplay user={user} />
				<UserPreferencesSection />
				<Segment>
					<PasswordForm
						displayFormSection={displayFormSection}
						changeFormSection={handleChangeFormSection}
					/>
				</Segment>
				<DeleteAccountSection onDeleteAccount={deleteAccount} />
			</SegmentGroup>
		</Stack>
	);
};
