import React, { forwardRef } from 'react';
import { Form } from 'radix-ui';
import { cn } from '@/styles/utils';
import { type RadixFormMatchType } from '@/types/radix-types';
import { type FormError } from '@/types/form-types';
import { getErrorState, getErrorMessage } from '@/utils/form-error-helpers';
import styles from './textarea.module.css';

export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
	error?: boolean | FormError;
	label?: string;
	message?: string;
	width?: string;
	height?: string;
	rows?: number;
	match?: RadixFormMatchType;
}

export interface TextAreaRootProps {
	children: React.ReactNode;
	className?: string;
	name: string;
	style?: React.CSSProperties;
}

const TextAreaRoot = ({
	children,
	className,
	name,
	style,
	...props
}: TextAreaRootProps) => {
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

TextAreaRoot.displayName = 'TextAreaRoot';

const TextAreaLabel = forwardRef<
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

TextAreaLabel.displayName = 'TextAreaLabel';

const TextAreaMessage = forwardRef<
	HTMLDivElement,
	{
		children: React.ReactNode;
		match?: RadixFormMatchType;
		className?: string;
		id?: string;
	}
>(({ children, match, className, id }, ref) => {
	return (
		<Form.Message ref={ref} match={match} className={cn(styles.message, className)} id={id} data-testid={id}>
			{children}
		</Form.Message>
	);
});

TextAreaMessage.displayName = 'TextAreaMessage';

const TextAreaInput = forwardRef<HTMLTextAreaElement, TextAreaProps>(
	({ error, className, label, message, name, width, height, match, ...props }, ref) => {
		const hasError = getErrorState(error);
		const errorMessage = getErrorMessage(error, message);
		const errorId = `${name}-error`;

		const textareaClasses = cn(
			styles.textarea,
			styles.textareaDefault,
			hasError && styles.textareaError,
			className,
		);

		if (!name) throw new Error('TextArea requires a name value');

		const textarea = (
			<Form.Control asChild>
				<textarea 
					ref={ref} 
					className={textareaClasses} 
					aria-invalid={hasError}
					aria-describedby={hasError ? errorId : undefined}
					{...props} 
				/>
			</Form.Control>
		);

		const rootStyle = {
			...(width && { width }),
			...(height && { height }),
		};
		const rootClassName = cn(width && styles.fieldResponsive);

		return (
			<TextAreaRoot name={name} className={rootClassName} style={rootStyle}>
				{label && <TextAreaLabel>{label}</TextAreaLabel>}
				{textarea}
				{errorMessage && <TextAreaMessage id={errorId} match={match}>{errorMessage}</TextAreaMessage>}
			</TextAreaRoot>
		);
	},
);

TextAreaInput.displayName = 'TextAreaInput';

const TextAreaStandalone = forwardRef<
	HTMLTextAreaElement,
	Omit<TextAreaProps, 'name'> & { name?: string }
>(({ error, className, width, height, ...props }, ref) => {
	const hasError = getErrorState(error);

	const textareaClasses = cn(
		styles.textarea,
		styles.textareaDefault,
		hasError && styles.textareaError,
		className,
	);

	const rootStyle = {
		...(width && { width }),
		...(height && { height }),
	};

	return (
		<div
			className={cn(styles.standalone, width && styles.fieldResponsive)}
			style={rootStyle}>
			<textarea ref={ref} className={textareaClasses} {...props} />
		</div>
	);
});

TextAreaStandalone.displayName = 'TextAreaStandalone';

// Export all components as object
export const TextArea = {
	Root: TextAreaRoot,
	Input: TextAreaInput,
	Standalone: TextAreaStandalone,
	Label: TextAreaLabel,
	Message: TextAreaMessage,
};

// Export individual components
export {
	TextAreaRoot,
	TextAreaInput,
	TextAreaStandalone,
	TextAreaLabel,
	TextAreaMessage,
};
