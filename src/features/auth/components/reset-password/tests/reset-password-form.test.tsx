import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import { ResetPasswordForm } from '../reset-password-form';
import { wrappedRender } from '@/tests/test-utils';
import { type ResetPasswordData } from '@/features/auth/types/auth-types';
import { type ZodFormErrors } from '@/hooks';

// Create mock form errors
const createMockFormErrors = (): ZodFormErrors<ResetPasswordData> => ({
	email: { error: false, message: '' },
	password: { error: false, message: '' },
	confirmPassword: { error: false, message: '' },
});

// Default props for the form component
const createDefaultProps = (
	overrides?: Partial<Parameters<typeof ResetPasswordForm>[0]>,
) => ({
	hasResetToken: false,
	emailSent: false,
	formErrors: createMockFormErrors(),
	serverError: { error: false, message: '' },
	onResetRequest: vi.fn(),
	onResetConfirm: vi.fn(),
	resetFormErrors: vi.fn(),
	...overrides,
});

describe('ResetPasswordForm - Form Submission', () => {
	it('calls onResetRequest with email when submitting password reset request', async () => {
		const mockOnResetRequest = vi.fn();
		const props = createDefaultProps({
			hasResetToken: false,
			onResetRequest: mockOnResetRequest,
		});

		const { user } = wrappedRender(<ResetPasswordForm {...props} />);

		// Fill out the email field
		const emailInput = screen.getByPlaceholderText('Email');
		await user.type(emailInput, 'jim@dundermifflin.com');

		// Submit the form
		await user.click(screen.getByRole('button', { name: /reset password/i }));

		expect(mockOnResetRequest).toHaveBeenCalledTimes(1);
		expect(mockOnResetRequest).toHaveBeenCalledWith({
			email: 'jim@dundermifflin.com',
		});
	});

	it('calls onResetConfirm with password data when submitting password confirmation', async () => {
		const mockOnResetConfirm = vi.fn();
		const props = createDefaultProps({
			hasResetToken: true,
			onResetConfirm: mockOnResetConfirm,
		});

		const { user } = wrappedRender(<ResetPasswordForm {...props} />);

		// Fill out the password fields
		await user.type(screen.getByTestId('password-input'), 'newPassword123');
		await user.type(screen.getByTestId('confirm-password-input'), 'newPassword123');

		// Submit the form
		await user.click(screen.getByRole('button', { name: /confirm new password/i }));

		expect(mockOnResetConfirm).toHaveBeenCalledTimes(1);
		expect(mockOnResetConfirm).toHaveBeenCalledWith({
			password: 'newPassword123',
			confirmPassword: 'newPassword123',
		});
	});

	it('does not call onResetConfirm when in email request mode', async () => {
		const mockOnResetRequest = vi.fn();
		const mockOnResetConfirm = vi.fn();
		const props = createDefaultProps({
			hasResetToken: false,
			onResetRequest: mockOnResetRequest,
			onResetConfirm: mockOnResetConfirm,
		});

		const { user } = wrappedRender(<ResetPasswordForm {...props} />);

		const emailInput = screen.getByPlaceholderText('Email');
		await user.type(emailInput, 'jim@dundermifflin.com');
		await user.click(screen.getByRole('button', { name: /reset password/i }));

		expect(mockOnResetRequest).toHaveBeenCalledTimes(1);
		expect(mockOnResetConfirm).not.toHaveBeenCalled();
	});

	it('does not call onResetRequest when in password confirmation mode', async () => {
		const mockOnResetRequest = vi.fn();
		const mockOnResetConfirm = vi.fn();
		const props = createDefaultProps({
			hasResetToken: true,
			onResetRequest: mockOnResetRequest,
			onResetConfirm: mockOnResetConfirm,
		});

		const { user } = wrappedRender(<ResetPasswordForm {...props} />);

		await user.type(screen.getByTestId('password-input'), 'newPassword123');
		await user.type(screen.getByTestId('confirm-password-input'), 'newPassword123');
		await user.click(screen.getByRole('button', { name: /confirm new password/i }));

		expect(mockOnResetConfirm).toHaveBeenCalledTimes(1);
		expect(mockOnResetRequest).not.toHaveBeenCalled();
	});
});

describe('ResetPasswordForm - Form States', () => {
	it('shows only email input when hasResetToken is false', () => {
		const props = createDefaultProps({
			hasResetToken: false,
		});

		wrappedRender(<ResetPasswordForm {...props} />);

		// Should show email input
		expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();

		// Should not show password inputs
		expect(screen.queryByTestId('password-input')).not.toBeInTheDocument();
		expect(screen.queryByTestId('confirm-password-input')).not.toBeInTheDocument();

		// Should show "Reset Password" button
		expect(screen.getByRole('button', { name: /reset password/i })).toBeInTheDocument();
	});

	it('shows password inputs when hasResetToken is true', () => {
		const props = createDefaultProps({
			hasResetToken: true,
		});

		wrappedRender(<ResetPasswordForm {...props} />);

		// Should not show email input
		expect(screen.queryByPlaceholderText('Email')).not.toBeInTheDocument();

		// Should show password inputs
		expect(screen.getByTestId('password-input')).toBeInTheDocument();
		expect(screen.getByTestId('confirm-password-input')).toBeInTheDocument();

		// Should show "Confirm New Password" button
		expect(
			screen.getByRole('button', { name: /confirm new password/i }),
		).toBeInTheDocument();
	});

	it('shows success message when email is sent', () => {
		const props = createDefaultProps({
			emailSent: true,
		});

		wrappedRender(<ResetPasswordForm {...props} />);

		expect(screen.getByText(/if you have an account on tidytrek/i)).toBeInTheDocument();
	});

	it('shows server error when present', () => {
		const props = createDefaultProps({
			serverError: { error: true, message: 'Invalid email address' },
		});

		wrappedRender(<ResetPasswordForm {...props} />);

		expect(screen.getByText('Invalid email address')).toBeInTheDocument();
	});
});

describe('ResetPasswordForm - Error Handling', () => {
	it('displays field validation errors', () => {
		const props = createDefaultProps({
			hasResetToken: true,
			// Passing in Zod input errors
			formErrors: {
				email: { error: false, message: '' },
				password: { error: true, message: 'Password is required' },
				confirmPassword: { error: true, message: 'Passwords must match' },
			},
		});

		wrappedRender(<ResetPasswordForm {...props} />);

		// Should show validation errors (and be accessible)
		const passwordField = screen.getByTestId('password-input');
		const confirmPasswordField = screen.getByTestId('confirm-password-input');

		// Password field accessibility
		expect(passwordField).toHaveAccessibleName();
		expect(passwordField).toHaveAttribute('aria-invalid', 'true');
		expect(passwordField).toHaveAttribute('aria-describedby', 'password-error');

		// Confirm password field accessibility
		expect(confirmPasswordField).toHaveAccessibleName();
		expect(confirmPasswordField).toHaveAttribute('aria-invalid', 'true');
		expect(confirmPasswordField).toHaveAttribute('aria-describedby', 'confirmPassword-error');

		// Error messages accessibility and content
		const passwordError = document.getElementById('password-error');
		const confirmPasswordError = document.getElementById('confirmPassword-error');

		expect(passwordError).toBeInTheDocument();
		expect(passwordError).toHaveTextContent('Password is required');

		expect(confirmPasswordError).toBeInTheDocument();
		expect(confirmPasswordError).toHaveTextContent('Passwords must match');
	});

	it('calls resetFormErrors when input changes', async () => {
		const mockResetFormErrors = vi.fn();
		const props = createDefaultProps({
			hasResetToken: false,
			resetFormErrors: mockResetFormErrors,
			formErrors: {
				email: { error: true, message: 'Invalid email' },
				password: { error: false, message: '' },
				confirmPassword: { error: false, message: '' },
			},
		});

		const { user } = wrappedRender(<ResetPasswordForm {...props} />);

		const emailInput = screen.getByPlaceholderText('Email');
		await user.type(emailInput, 'j');

		// Should call resetFormErrors when typing in a field with an error
		expect(mockResetFormErrors).toHaveBeenCalled();
	});

	it('clears server error when input changes', async () => {
		const mockResetFormErrors = vi.fn();
		const props = createDefaultProps({
			hasResetToken: false,
			serverError: { error: true, message: 'Server error' },
			resetFormErrors: mockResetFormErrors,
		});

		const { user } = wrappedRender(<ResetPasswordForm {...props} />);

		const emailInput = screen.getByPlaceholderText('Email');
		await user.type(emailInput, 'j');

		// Should call resetFormErrors to clear server error
		expect(mockResetFormErrors).toHaveBeenCalled();
	});
});

describe('ResetPasswordForm - Navigation Links', () => {
	it('displays login and signup links', () => {
		const props = createDefaultProps();

		wrappedRender(<ResetPasswordForm {...props} />);

		expect(screen.getByRole('link', { name: /log in/i })).toBeInTheDocument();
		expect(screen.getByRole('link', { name: /sign up/i })).toBeInTheDocument();
	});
});
