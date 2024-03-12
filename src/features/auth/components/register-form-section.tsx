import { type InputEvent } from '@/types/form-types';
import { type RegisterUserFormData } from '@/types/user-types';
import { Form } from 'semantic-ui-react';

type RegisterFormSectionProps = {
	formData: RegisterUserFormData;
	onFormChange: (e: InputEvent) => void;
};

export const RegisterFormSection = ({
	formData,
	onFormChange,
}: RegisterFormSectionProps) => {
	return (
		<Form.Group>
			<Form.Input
				icon="user"
				iconPosition="left"
				placeholder="First Name"
				name="firstName"
				data-testid="first-name-input"
				type="name"
				value={formData.firstName}
				width={8}
				onChange={onFormChange}
			/>
			<Form.Input
				icon="user"
				iconPosition="left"
				placeholder="Last Name"
				name="lastName"
				value={formData.lastName}
				data-testid="last-name-input"
				type="name"
				width={8}
				onChange={onFormChange}
			/>
		</Form.Group>
	);
};
