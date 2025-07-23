import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import { WelcomeForm } from '../welcome-form';
import { wrappedRender } from '@/tests/wrapper-utils';

// Mock React Router (dependency, not used for test logic)
vi.mock('react-router-dom', async () => {
	const actual = await vi.importActual('react-router-dom');
	return {
		...actual,
		useNavigate: () => vi.fn(),
		Link: ({ to, children }: { to: string; children: React.ReactNode }) => <a href={to}>{children}</a>,
	};
});

// Mock the mutations (return no-op functions)
vi.mock('@/queries/profile-settings-queries', () => ({
	useUpdateUsernameMutation: () => ({
		mutateAsync: vi.fn(),
		isPending: false,
	}),
	useGenerateUsernameQuery: () => ({
		refetch: vi.fn().mockResolvedValue({ data: { username: 'generated_username' } }),
	}),
}));

// Mock the API (dependency, not used for test logic)
vi.mock('@/api/tidytrek-api', () => ({
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
			expect(screen.getByRole('button', { name: /continue/i })).toBeInTheDocument();
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
		it('shows validation error with empty username', async () => {
			const { user } = renderWelcomeForm('initial_username');

			// Clear the username field
			const usernameInput = screen.getByDisplayValue('initial_username');
			await user.clear(usernameInput);

			// Save username/submit form
			await user.click(screen.getByRole('button', { name: /continue/i }));

			await vi.waitFor(() => {
				// Re-query the input after state change
				const usernameInputAfterValidation = screen.getByLabelText('Username');

				expect(usernameInputAfterValidation).toHaveAccessibleName();
				expect(usernameInputAfterValidation).toHaveAttribute('aria-invalid', 'true');

				const errorMessage = document.getElementById('username-error');
				expect(errorMessage).toBeInTheDocument();
				expect(errorMessage).toHaveTextContent('Username must be at least');
			});
		});
	});
});
