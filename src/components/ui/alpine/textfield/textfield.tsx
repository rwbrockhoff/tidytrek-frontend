import React, { forwardRef } from 'react';
import { Form } from 'radix-ui';
import { cn } from '@/styles/utils';
import { type RadixInputType, type RadixFormMatchType } from '@/types/radix-types';
import { type FormError } from '@/types/form-types';
import { getErrorState, getErrorMessage } from '@/utils/form-error-helpers';
import styles from './textfield.module.css';

export interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
	variant?: 'default' | 'minimal' | 'icon';
	error?: boolean | FormError;
	type?: RadixInputType;
	label?: string;
	message?: string;
	icon?: React.ReactNode;
	iconPosition?: 'left' | 'right';
	iconIsButton?: boolean;
	width?: string;
}

export interface TextFieldRootProps {
	children: React.ReactNode;
	className?: string;
	name: string;
	style?: React.CSSProperties;
}

export interface TextFieldSlotProps {
	children: React.ReactNode;
	side?: 'left' | 'right';
	iconIsButton?: boolean;
}

const TextFieldRoot = ({
	children,
	className,
	name,
	style,
	...props
}: TextFieldRootProps) => {
	return (
		<Form.Field
			name={name}
			className={cn(styles.field, className)}
			style={style}
			{...props}>
			{children}
		</Form.Field>
	);
};

TextFieldRoot.displayName = 'TextFieldRoot';

const TextFieldLabel = forwardRef<
	HTMLLabelElement,
	{
		children: React.ReactNode;
		className?: string;
	}
>(({ children, className }, ref) => {
	return (
		<Form.Label ref={ref} className={cn(styles.label, className)}>
			{children}
		</Form.Label>
	);
});

TextFieldLabel.displayName = 'TextFieldLabel';

const TextFieldSlot = ({
	children,
	side = 'left',
	iconIsButton = false,
}: TextFieldSlotProps) => {
	return (
		<div
			className={cn(
				styles.slot,
				side === 'right' && styles.slotRight,
				iconIsButton && styles.slotButton,
			)}>
			{children}
		</div>
	);
};

const TextFieldMessage = forwardRef<
	HTMLDivElement,
	{
		children: React.ReactNode;
		match?: RadixFormMatchType;
		className?: string;
	}
>(({ children, match, className }, ref) => {
	return (
		<Form.Message ref={ref} match={match} className={cn(styles.message, className)}>
			{children}
		</Form.Message>
	);
});

TextFieldMessage.displayName = 'TextFieldMessage';

const TextFieldInput = forwardRef<HTMLInputElement, TextFieldProps>(
	(
		{
			variant = 'default',
			error,
			type = 'text',
			className,
			icon,
			iconPosition = 'left',
			iconIsButton = false,
			label,
			message,
			name,
			width,
			...props
		},
		ref,
	) => {
		const hasError = getErrorState(error);
		const errorMessage = getErrorMessage(error, message);

		const inputClasses = cn(
			styles.input,
			variant === 'default' && styles.inputDefault,
			variant === 'minimal' && styles.inputMinimal,
			variant === 'icon' && styles.inputIcon,
			hasError && styles.inputError,
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

		const rootStyle = width ? { width } : undefined;
		const rootClassName = cn(styles.rootIcon, width && styles.fieldResponsive);

		if (variant === 'icon' && icon) {
			return (
				<TextFieldRoot name={name} className={rootClassName} style={rootStyle}>
					{label && <TextFieldLabel>{label}</TextFieldLabel>}
					<div className={styles.inputContainer}>
						{iconPosition === 'left' && (
							<TextFieldSlot side="left" iconIsButton={iconIsButton}>
								{icon}
							</TextFieldSlot>
						)}
						{input}
						{iconPosition === 'right' && (
							<TextFieldSlot side="right" iconIsButton={iconIsButton}>
								{icon}
							</TextFieldSlot>
						)}
					</div>
					{errorMessage && <TextFieldMessage>{errorMessage}</TextFieldMessage>}
				</TextFieldRoot>
			);
		}

		return (
			<TextFieldRoot
				name={name}
				className={cn(width && styles.fieldResponsive)}
				style={rootStyle}>
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
			error,
			type = 'text',
			className,
			icon,
			iconPosition = 'left',
			width,
			...props
		},
		ref,
	) => {
		const hasError = getErrorState(error);

		const inputClasses = cn(
			styles.input,
			variant === 'default' && styles.inputDefault,
			variant === 'minimal' && styles.inputMinimal,
			variant === 'icon' && styles.inputIcon,
			hasError && styles.inputError,
			className,
		);

		const rootStyle = width ? { width } : undefined;

		if (variant === 'icon' && icon) {
			return (
				<div
					className={cn(
						styles.rootIcon,
						styles.standalone,
						width && styles.fieldResponsive,
					)}
					style={rootStyle}>
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

		return (
			<div
				className={cn(styles.standalone, width && styles.fieldResponsive)}
				style={rootStyle}>
				<input ref={ref} type={type} className={inputClasses} {...props} />
			</div>
		);
	},
);

// forwardRef loses the function name, so set displayName for React DevTools
TextFieldStandalone.displayName = 'TextFieldStandalone';

// Export component object
export const TextField = {
	Root: TextFieldRoot,
	Input: TextFieldInput,
	Standalone: TextFieldStandalone,
	Label: TextFieldLabel,
	Message: TextFieldMessage,
	Slot: TextFieldSlot,
};
// Export individual components
export {
	TextFieldRoot,
	TextFieldInput,
	TextFieldStandalone,
	TextFieldLabel,
	TextFieldMessage,
	TextFieldSlot,
};
