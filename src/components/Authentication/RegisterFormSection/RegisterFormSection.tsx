import { type InputEvent, type CheckboxEvent } from '../../../types/formTypes';
import { Form } from 'semantic-ui-react';
import { RegisterUserFormData } from '../../../types/userTypes';

type RegisterFormSectionProps = {
	formData: RegisterUserFormData;
	onFormChange: (e: InputEvent | CheckboxEvent) => void;
};

const RegisterFormSection = ({ formData, onFormChange }: RegisterFormSectionProps) => {
	return (
		<>
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
			<Form.Input
				fluid
				icon="user"
				iconPosition="left"
				placeholder="Username (optional)"
				name="username"
				value={formData.username}
				data-testid="username-input"
				type="name"
				onChange={onFormChange}
			/>
			<Form.Input
				fluid
				icon="tree"
				iconPosition="left"
				placeholder="Trail Name (optional)"
				name="trailName"
				value={formData.trailName}
				data-testid="trail-name-input"
				type="name"
				onChange={onFormChange}
			/>
		</>
	);
};

export default RegisterFormSection;
