import React, { forwardRef } from 'react';
import { Form } from 'radix-ui';
import { cn } from '@/styles/utils';
import { type RadixInputType, type RadixFormMatchType } from '@/types/radix-types';
import styles from './textfield.module.css';

export interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
	variant?: 'default' | 'minimal' | 'icon';
	error?: boolean;
	type?: RadixInputType;
	label?: string;
	message?: string;
	icon?: React.ReactNode;
	iconPosition?: 'left' | 'right';
}

export interface TextFieldRootProps {
	children: React.ReactNode;
	className?: string;
	name: string;
}

export interface TextFieldSlotProps {
	children: React.ReactNode;
	side?: 'left' | 'right';
}

const TextFieldRoot = ({ children, className, name, ...props }: TextFieldRootProps) => {
	return (
		<Form.Field name={name} className={cn(styles.field, className)} {...props}>
			{children}
		</Form.Field>
	);
};

const TextFieldLabel = ({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) => {
	return <Form.Label className={cn(styles.label, className)}>{children}</Form.Label>;
};

const TextFieldSlot = ({ children, side = 'left' }: TextFieldSlotProps) => {
	return (
		<div className={cn(styles.slot, side === 'right' && styles.slotRight)}>
			{children}
		</div>
	);
};

const TextFieldMessage = ({
	children,
	match,
	className,
}: {
	children: React.ReactNode;
	match?: RadixFormMatchType;
	className?: string;
}) => {
	return (
		<Form.Message match={match} className={cn(styles.message, className)}>
			{children}
		</Form.Message>
	);
};

const TextFieldInput = forwardRef<HTMLInputElement, TextFieldProps>(
	(
		{
			variant = 'default',
			error = false,
			type = 'text',
			className,
			icon,
			iconPosition = 'left',
			label,
			message,
			name,
			...props
		},
		ref,
	) => {
		const inputClasses = cn(
			styles.input,
			variant === 'default' && styles.inputDefault,
			variant === 'minimal' && styles.inputMinimal,
			variant === 'icon' && styles.inputIcon,
			error && styles.inputError,
			className,
		);

		if (!name) {
			throw new Error('TextField requires a name prop');
		}

		const input = (
			<Form.Control asChild>
				<input ref={ref} type={type} className={inputClasses} {...props} />
			</Form.Control>
		);

		if (variant === 'icon' && icon) {
			return (
				<TextFieldRoot name={name} className={cn(styles.rootIcon)}>
					{label && <TextFieldLabel>{label}</TextFieldLabel>}
					<div className={styles.inputContainer}>
						{iconPosition === 'left' && <TextFieldSlot side="left">{icon}</TextFieldSlot>}
						{input}
						{iconPosition === 'right' && (
							<TextFieldSlot side="right">{icon}</TextFieldSlot>
						)}
					</div>
					{message && <TextFieldMessage>{message}</TextFieldMessage>}
				</TextFieldRoot>
			);
		}

		return (
			<TextFieldRoot name={name}>
				{label && <TextFieldLabel>{label}</TextFieldLabel>}
				{input}
				{message && <TextFieldMessage>{message}</TextFieldMessage>}
			</TextFieldRoot>
		);
	},
);

// forwardRef loses the function name, so set displayName for React DevTools
TextFieldInput.displayName = 'TextFieldInput';

// For standalone usage without form context
const TextFieldStandalone = forwardRef<
	HTMLInputElement,
	Omit<TextFieldProps, 'name'> & { name?: string }
>(
	(
		{
			variant = 'default',
			error = false,
			type = 'text',
			className,
			icon,
			iconPosition = 'left',
			...props
		},
		ref,
	) => {
		const inputClasses = cn(
			styles.input,
			variant === 'default' && styles.inputDefault,
			variant === 'minimal' && styles.inputMinimal,
			variant === 'icon' && styles.inputIcon,
			error && styles.inputError,
			className,
		);

		if (variant === 'icon' && icon) {
			return (
				<div className={cn(styles.rootIcon, styles.standalone)}>
					<div className={styles.inputContainer}>
						{iconPosition === 'left' && <TextFieldSlot side="left">{icon}</TextFieldSlot>}
						<input ref={ref} type={type} className={inputClasses} {...props} />
						{iconPosition === 'right' && (
							<TextFieldSlot side="right">{icon}</TextFieldSlot>
						)}
					</div>
				</div>
			);
		}

		return <input ref={ref} type={type} className={inputClasses} {...props} />;
	},
);

// forwardRef loses the function name, so set displayName for React DevTools
TextFieldStandalone.displayName = 'TextFieldStandalone';

// Export compound component
export const TextField = {
	Root: TextFieldRoot,
	Input: TextFieldInput,
	Standalone: TextFieldStandalone,
	Label: TextFieldLabel,
	Message: TextFieldMessage,
	Slot: TextFieldSlot,
};

// Export individual components for flexibility
export {
	TextFieldRoot,
	TextFieldInput,
	TextFieldStandalone,
	TextFieldLabel,
	TextFieldMessage,
	TextFieldSlot,
};
