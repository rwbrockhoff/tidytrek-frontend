import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import { WelcomeForm } from '../welcome-form';
import { wrappedRender } from '@/tests/test-utils';

// Mock React Router (dependency, not used for test logic)
vi.mock('react-router-dom', async () => {
	const actual = await vi.importActual('react-router-dom');
	return {
		...actual,
		useNavigate: () => vi.fn(),
		Link: ({ to, children }: any) => <a href={to}>{children}</a>,
	};
});

// Mock the mutations (return no-op functions)
vi.mock('@/queries/profile-settings-queries', () => ({
	useUpdateUsernameMutation: () => ({
		mutateAsync: vi.fn(),
		isPending: false,
	}),
}));

// Mock the API (dependency, not used for test logic)
vi.mock('@/api/tidytrekAPI', () => ({
	tidyTrekAPI: {
		get: vi.fn(),
	},
}));

describe('WelcomeForm', () => {
	const renderWelcomeForm = (defaultUsername?: string) => {
		return wrappedRender(<WelcomeForm defaultUsername={defaultUsername} />);
	};

	describe('Form UI', () => {
		it('renders welcome form with default username', () => {
			renderWelcomeForm('jim_halpert');

			expect(screen.getByDisplayValue('jim_halpert')).toBeInTheDocument();
			expect(screen.getByPlaceholderText('Trail Name')).toBeInTheDocument();
			expect(screen.getByRole('button', { name: /save/i })).toBeInTheDocument();
		});

		it('renders welcome form with empty username', () => {
			renderWelcomeForm();

			const usernameInput = screen.getByPlaceholderText('Username');
			expect(usernameInput).toHaveValue('');
			expect(screen.getByPlaceholderText('Trail Name')).toBeInTheDocument();
		});

		it('renders username generation button', () => {
			renderWelcomeForm();

			// The refresh button should be present (and be accessible)
			const refreshButton = screen.getByRole('button', {
				name: /generate random username/i,
			});
			expect(refreshButton).toBeInTheDocument();
			expect(refreshButton).toHaveAccessibleName();
		});
	});

	describe('Form Interactions', () => {
		it('allows typing in username field', async () => {
			const { user } = renderWelcomeForm();

			const usernameInput = screen.getByPlaceholderText('Username');
			await user.type(usernameInput, 'dwight_schrute');

			expect(usernameInput).toHaveValue('dwight_schrute');
		});

		it('allows typing in trail name field', async () => {
			const { user } = renderWelcomeForm();

			const trailNameInput = screen.getByPlaceholderText('Trail Name');
			await user.type(trailNameInput, 'Beet Farmer');

			expect(trailNameInput).toHaveValue('Beet Farmer');
		});

		it('updates form state when inputs change', async () => {
			const { user } = renderWelcomeForm('initial_name');

			const usernameInput = screen.getByDisplayValue('initial_name');
			await user.clear(usernameInput);
			await user.type(usernameInput, 'new_name');

			expect(usernameInput).toHaveValue('new_name');
		});
	});

	describe('Form Validation', () => {
		it('shows validation error when submitting without username', async () => {
			const { user } = renderWelcomeForm('initial_username');

			// Clear the username field
			const usernameInput = screen.getByDisplayValue('initial_username');
			await user.clear(usernameInput);

			// Save username/submit form
			await user.click(screen.getByRole('button', { name: /save/i }));

			// Should show validation error (and be accessible)
			await vi.waitFor(() => {
				// Input accessibility
				expect(usernameInput).toHaveAccessibleName();
				expect(usernameInput).toHaveAttribute('aria-invalid', 'true');
				expect(usernameInput).toHaveAttribute('aria-describedby', 'username-error');
				
				// Error message accessibility and content
				const errorMessage = document.getElementById('username-error');
				expect(errorMessage).toBeInTheDocument();
				expect(errorMessage).toHaveTextContent('Username must be at least');
			});
		});
	});
});
