import { type User } from '@/types/user-types';
import { type FormSection } from '@/features/account/types';
import { useState } from 'react';
import { Flex } from '@radix-ui/themes';
import { Segment, SegmentGroup } from '@/components/ui';
import { PasswordForm } from './password-form/password-form';
import { AccountInfoDisplay } from '../account-info-display';
import { DeleteAccountSection } from '../delete-account-section';

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
		<Flex direction="column">
			<SegmentGroup direction="column">
				<AccountInfoDisplay user={user} />
				<Segment stacked>
					<PasswordForm
						displayFormSection={displayFormSection}
						changeFormSection={handleChangeFormSection}
					/>
				</Segment>
				<DeleteAccountSection onDeleteAccount={deleteAccount} />
			</SegmentGroup>
		</Flex>
	);
};
