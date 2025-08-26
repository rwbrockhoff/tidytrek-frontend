import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import { ProfileFormFields } from '../profile-form-fields';
import { wrappedRender } from '@/tests/wrapper-utils';

// props for basic rendering tests
const mockProps = {
	userInfo: {
		username: 'jim_halpert',
		trailName: 'Paper Salesman',
		userLocation: 'Scranton, Pennsylvania',
		userBio: 'Love hiking and exploring the great outdoors',
	},
	isProfileChanged: false,
	isSuccess: false,
	isError: false,
	error: null,
	formErrors: {
		username: { error: false, message: '' },
		trailName: { error: false, message: '' },
		userBio: { error: false, message: '' },
		userLocation: { error: false, message: '' },
	},
	onInput: vi.fn(),
	onSubmit: vi.fn(),
	onGenerateUsername: vi.fn(),
};

describe('ProfileFormFields', () => {
	const renderProfileFormFields = () => {
		return wrappedRender(<ProfileFormFields {...mockProps} />);
	};

	describe('Form Rendering', () => {
		it('renders profile form with existing profile data', () => {
			renderProfileFormFields();

			expect(screen.getByDisplayValue('jim_halpert')).toBeInTheDocument();
			expect(screen.getByDisplayValue('Paper Salesman')).toBeInTheDocument();
			expect(screen.getByDisplayValue('Scranton, Pennsylvania')).toBeInTheDocument();
			expect(
				screen.getByDisplayValue('Love hiking and exploring the great outdoors'),
			).toBeInTheDocument();
		});

		it('renders profile form with empty fields when no profile data', () => {
			const emptyProps = {
				...mockProps,
				userInfo: {
					username: '',
					trailName: '',
					userLocation: '',
					userBio: '',
				},
			};

			wrappedRender(<ProfileFormFields {...emptyProps} />);

			expect(screen.getByPlaceholderText('Username')).toHaveValue('');
			expect(screen.getByPlaceholderText('Trail Name')).toHaveValue('');
			expect(screen.getByPlaceholderText('Denver, Colorado')).toHaveValue('');
			expect(screen.getByPlaceholderText('Bio for your profile')).toHaveValue('');
		});

		it('renders form fields with proper labels', () => {
			renderProfileFormFields();

			expect(screen.getByLabelText('Username')).toBeInTheDocument();
			expect(screen.getByLabelText('Trail Name')).toBeInTheDocument();
			expect(screen.getByLabelText('Based In')).toBeInTheDocument();
			expect(screen.getByLabelText('Your Bio')).toBeInTheDocument();
		});

		it('renders username generation button with accessibility', () => {
			renderProfileFormFields();

			// The refresh button should be present (and be accessible)
			const refreshButton = screen.getByRole('button', {
				name: /generate random username/i,
			});
			expect(refreshButton).toBeInTheDocument();
			expect(refreshButton).toHaveAccessibleName();
		});

		it('renders save button initially disabled', () => {
			renderProfileFormFields();

			const saveButton = screen.getByRole('button', { name: /save profile/i });
			expect(saveButton).toBeDisabled();
		});
	});

	describe('Callbacks', () => {
		it('calls onSubmit when form is submitted', async () => {
			const mockOnSubmit = vi.fn();
			const props = { ...mockProps, onSubmit: mockOnSubmit, isProfileChanged: true };
			const { user } = wrappedRender(<ProfileFormFields {...props} />);

			const saveButton = screen.getByRole('button', { name: /save profile/i });
			await user.click(saveButton);

			expect(mockOnSubmit).toHaveBeenCalled();
		});

		it('calls onGenerateUsername when generate button is clicked', async () => {
			const mockOnGenerateUsername = vi.fn();
			const props = { ...mockProps, onGenerateUsername: mockOnGenerateUsername };
			const { user } = wrappedRender(<ProfileFormFields {...props} />);

			const generateButton = screen.getByRole('button', {
				name: /generate random username/i,
			});
			await user.click(generateButton);

			expect(mockOnGenerateUsername).toHaveBeenCalled();
		});
	});

	describe('Form Validation', () => {
		it('shows validation error for invalid username', () => {
			const props = {
				...mockProps,
				formErrors: {
					username: { error: true, message: 'Username must be at least 3 characters' },
					trailName: { error: false, message: '' },
					userBio: { error: false, message: '' },
					userLocation: { error: false, message: '' },
				},
			};

			wrappedRender(<ProfileFormFields {...props} />);

			const usernameInput = screen.getByDisplayValue('jim_halpert');

			// Should show accessible error
			expect(usernameInput).toHaveAccessibleName();
			expect(usernameInput).toHaveAttribute('aria-describedby', 'username-error');

			const errorMessage = document.getElementById('username-error');
			expect(errorMessage).toBeInTheDocument();
			expect(errorMessage).toHaveTextContent('Username must be at least 3 characters');
		});
	});
});
