import { type InputEvent, type CheckboxEvent } from '../../../types/formTypes';
import { Form } from 'semantic-ui-react';

type RegisterFormSectionProps = {
	onFormChange: (e: InputEvent | CheckboxEvent) => void;
};

const RegisterFormSection = ({ onFormChange }: RegisterFormSectionProps) => {
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
					width={8}
					onChange={onFormChange}
				/>
				<Form.Input
					icon="user"
					iconPosition="left"
					placeholder="Last Name"
					name="lastName"
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
				data-testid="trail-name-input"
				type="name"
				onChange={onFormChange}
			/>
		</>
	);
};

export default RegisterFormSection;
