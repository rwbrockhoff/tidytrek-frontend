import React, { forwardRef } from 'react';
import { Dialog } from 'radix-ui';
import { cn } from '@/styles/utils';
import styles from './modal.module.css';

export interface ModalProps {
	open: boolean;
	onOpenChange?: (open: boolean) => void;
	children: React.ReactNode;
}

export interface ModalOverlayProps extends React.ComponentProps<typeof Dialog.Overlay> {}

export interface ModalContentProps extends React.ComponentProps<typeof Dialog.Content> {
	size?: 'sm' | 'md' | 'lg' | 'xl';
}

export interface ModalTitleProps extends React.ComponentProps<typeof Dialog.Title> {
	children: React.ReactNode;
}

export interface ModalDescriptionProps extends React.ComponentProps<typeof Dialog.Description> {
	children: React.ReactNode;
}

export interface ModalHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
	children: React.ReactNode;
}

export interface ModalBodyProps extends React.HTMLAttributes<HTMLDivElement> {
	children: React.ReactNode;
}

export interface ModalFooterProps extends React.HTMLAttributes<HTMLDivElement> {
	children: React.ReactNode;
}

const Root: React.FC<ModalProps> = ({ open, onOpenChange, children }) => {
	return (
		<Dialog.Root open={open} onOpenChange={onOpenChange}>
			{children}
		</Dialog.Root>
	);
};

Root.displayName = 'ModalRoot';

const Overlay = forwardRef<React.ElementRef<typeof Dialog.Overlay>, ModalOverlayProps>(
	({ className, ...props }, ref) => {
		return (
			<Dialog.Overlay ref={ref} className={cn(styles.overlay, className)} {...props} />
		);
	},
);

Overlay.displayName = 'ModalOverlay';

const Content = forwardRef<React.ElementRef<typeof Dialog.Content>, ModalContentProps>(
	({ className, size = 'md', children, ...props }, ref) => {
		return (
			<Dialog.Portal>
				<Dialog.Content
					ref={ref}
					className={cn(
						styles.modal,
						size === 'sm' && styles.modalSm,
						size === 'md' && styles.modalMd,
						size === 'lg' && styles.modalLg,
						size === 'xl' && styles.modalXl,
					)}
					{...props}
				>
					<div className={cn(styles.content, className)}>
						{children}
					</div>
				</Dialog.Content>
			</Dialog.Portal>
		);
	},
);

Content.displayName = 'ModalContent';

const Title = forwardRef<React.ElementRef<typeof Dialog.Title>, ModalTitleProps>(
	({ className, children, ...props }, ref) => {
		return (
			<Dialog.Title ref={ref} className={cn(styles.title, className)} {...props}>
				{children}
			</Dialog.Title>
		);
	},
);

Title.displayName = 'ModalTitle';

const Description = forwardRef<React.ElementRef<typeof Dialog.Description>, ModalDescriptionProps>(
	({ className, children, ...props }, ref) => {
		return (
			<Dialog.Description ref={ref} className={cn(styles.description, className)} {...props}>
				{children}
			</Dialog.Description>
		);
	},
);

Description.displayName = 'ModalDescription';

const Header = forwardRef<HTMLDivElement, ModalHeaderProps>(
	({ className, children, ...props }, ref) => {
		return (
			<div ref={ref} className={cn(styles.header, className)} {...props}>
				{children}
			</div>
		);
	},
);

Header.displayName = 'ModalHeader';

const Body = forwardRef<HTMLDivElement, ModalBodyProps>(
	({ className, children, ...props }, ref) => {
		return (
			<div ref={ref} className={cn(styles.body, className)} {...props}>
				{children}
			</div>
		);
	},
);

Body.displayName = 'ModalBody';

const Footer = forwardRef<HTMLDivElement, ModalFooterProps>(
	({ className, children, ...props }, ref) => {
		return (
			<div ref={ref} className={cn(styles.footer, className)} {...props}>
				{children}
			</div>
		);
	},
);

Footer.displayName = 'ModalFooter';

// Export components
export { Root, Overlay, Content, Title, Description, Header, Body, Footer };