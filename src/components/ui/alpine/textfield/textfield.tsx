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
	match?: RadixFormMatchType;
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

const Root = ({
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

Root.displayName = 'TextFieldRoot';

const Label = forwardRef<
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

Label.displayName = 'TextFieldLabel';

const Slot = ({
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

Slot.displayName = 'TextFieldSlot';

const Message = forwardRef<
	HTMLDivElement,
	{
		children: React.ReactNode;
		match?: RadixFormMatchType;
		className?: string;
		id?: string;
	}
>(({ children, match, className, id }, ref) => {
	return (
		<Form.Message
			ref={ref}
			match={match}
			className={cn(styles.message, className)}
			id={id}>
			{children}
		</Form.Message>
	);
});

Message.displayName = 'TextFieldMessage';

const Input = forwardRef<HTMLInputElement, TextFieldProps>(
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
			match,
			...props
		},
		ref,
	) => {
		const hasError = getErrorState(error);
		const errorMessage = getErrorMessage(error, message);
		const errorId = `${name}-error`;

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
				<input
					ref={ref}
					type={type}
					className={inputClasses}
					aria-invalid={hasError}
					aria-describedby={hasError ? errorId : undefined}
					{...props}
				/>
			</Form.Control>
		);

		const rootStyle = width ? { width } : undefined;
		const rootClassName = cn(styles.rootIcon, width && styles.fieldResponsive);

		if (variant === 'icon' && icon) {
			return (
				<Root name={name} className={rootClassName} style={rootStyle}>
					{label && <Label>{label}</Label>}
					<div className={styles.inputContainer}>
						{iconPosition === 'left' && (
							<Slot side="left" iconIsButton={iconIsButton}>
								{icon}
							</Slot>
						)}
						{input}
						{iconPosition === 'right' && (
							<Slot side="right" iconIsButton={iconIsButton}>
								{icon}
							</Slot>
						)}
					</div>
					{errorMessage && (
						<Message id={errorId} match={match}>
							{errorMessage}
						</Message>
					)}
				</Root>
			);
		}

		return (
			<Root
				name={name}
				className={cn(width && styles.fieldResponsive)}
				style={rootStyle}>
				{label && <Label>{label}</Label>}
				{input}
				{errorMessage && (
					<Message id={errorId} match={match}>
						{errorMessage}
					</Message>
				)}
			</Root>
		);
	},
);

// forwardRef loses the function name, so set displayName for React DevTools
Input.displayName = 'TextFieldInput';

// For standalone usage without form context
const Standalone = forwardRef<
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
						{iconPosition === 'left' && <Slot side="left">{icon}</Slot>}
						<input ref={ref} type={type} className={inputClasses} {...props} />
						{iconPosition === 'right' && (
							<Slot side="right">{icon}</Slot>
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
Standalone.displayName = 'TextFieldStandalone';

// Export components
export { Root, Input, Standalone, Label, Message, Slot };
