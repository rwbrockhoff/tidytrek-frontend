import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import { ProfileForm } from '../profile-form/profile-form';
import { wrappedRender } from '@/tests/wrapper-utils';
import { type ProfileInfo, type SocialLink } from '@/types/profile-types';
import {
	createMockProfileInfo,
	createMockSocialLinks,
} from '@/tests/mocks/profile-mocks';

// Mock profile actions hook (dependency, not used for test logic)
vi.mock('../../hooks/use-profile-actions', () => ({
	useProfileActions: () => ({
		mutations: {
			editProfile: {
				mutate: vi.fn(),
				// Mutation states required
				isSuccess: false,
				isError: false,
				error: null,
				reset: vi.fn(),
			},
		},
	}),
}));

// Mock API (dependency, not used for test logic)
vi.mock('@/api/tidytrek-api', () => ({
	tidyTrekAPI: {
		get: vi.fn(),
	},
}));

describe('ProfileForm', () => {
	const renderProfileForm = (
		profileInfo?: ProfileInfo,
		socialLinks: SocialLink[] = createMockSocialLinks(),
	) => {
		return wrappedRender(
			<ProfileForm profileInfo={profileInfo} socialLinks={socialLinks} />,
		);
	};

	describe('Form Rendering', () => {
		it('renders profile form with existing profile data', () => {
			const profileInfo = createMockProfileInfo();
			renderProfileForm(profileInfo);

			expect(screen.getByDisplayValue('jim_halpert')).toBeInTheDocument();
			expect(screen.getByDisplayValue('Paper Salesman')).toBeInTheDocument();
			expect(screen.getByDisplayValue('Scranton, Pennsylvania')).toBeInTheDocument();
			expect(
				screen.getByDisplayValue('Love hiking and exploring the great outdoors'),
			).toBeInTheDocument();
		});

		it('renders profile form with empty fields when no profile data', () => {
			renderProfileForm();

			expect(screen.getByPlaceholderText('Username')).toHaveValue('');
			expect(screen.getByPlaceholderText('Trail Name')).toHaveValue('');
			expect(screen.getByPlaceholderText('Denver, Colorado')).toHaveValue('');
			expect(screen.getByPlaceholderText('Bio for your profile')).toHaveValue('');
		});

		it('renders form fields with proper labels', () => {
			renderProfileForm();

			expect(screen.getByLabelText('Username')).toBeInTheDocument();
			expect(screen.getByLabelText('Trail Name')).toBeInTheDocument();
			expect(screen.getByLabelText('Based In')).toBeInTheDocument();
			expect(screen.getByLabelText('Your Bio')).toBeInTheDocument();
		});

		it('renders username generation button with accessibility', () => {
			renderProfileForm();

			// The refresh button should be present (and be accessible)
			const refreshButton = screen.getByRole('button', {
				name: /generate random username/i,
			});
			expect(refreshButton).toBeInTheDocument();
			expect(refreshButton).toHaveAccessibleName();
		});

		it('renders save button initially disabled', () => {
			renderProfileForm();

			const saveButton = screen.getByRole('button', { name: /save profile/i });
			expect(saveButton).toBeDisabled();
		});
	});

	describe('Form Interactions', () => {
		it('allows typing in username field', async () => {
			const { user } = renderProfileForm();

			const usernameInput = screen.getByPlaceholderText('Username');
			await user.type(usernameInput, 'dwight_schrute');

			expect(usernameInput).toHaveValue('dwight_schrute');
		});

		it('allows typing in trail name field', async () => {
			const { user } = renderProfileForm();

			const trailNameInput = screen.getByPlaceholderText('Trail Name');
			await user.type(trailNameInput, 'Beet Farmer');

			expect(trailNameInput).toHaveValue('Beet Farmer');
		});

		it('allows typing in location field', async () => {
			const { user } = renderProfileForm();

			const locationInput = screen.getByPlaceholderText('Denver, Colorado');
			await user.type(locationInput, 'Scranton, PA');

			expect(locationInput).toHaveValue('Scranton, PA');
		});

		it('allows typing in bio textarea', async () => {
			const { user } = renderProfileForm();

			const bioTextarea = screen.getByPlaceholderText('Bio for your profile');
			await user.type(bioTextarea, 'Assistant to the Regional Manager');

			expect(bioTextarea).toHaveValue('Assistant to the Regional Manager');
		});

		it('enables save button when form data changes', async () => {
			const profileInfo = createMockProfileInfo();
			const { user } = renderProfileForm(profileInfo);

			const saveButton = screen.getByRole('button', { name: /save profile/i });
			expect(saveButton).toBeDisabled();

			// Make a change to enable the button
			const usernameInput = screen.getByDisplayValue('jim_halpert');
			await user.type(usernameInput, '_updated');

			expect(saveButton).toBeEnabled();
		});
	});

	describe('Form Validation', () => {
		it('shows validation error for invalid username', async () => {
			const profileInfo = createMockProfileInfo();
			const { user } = renderProfileForm(profileInfo);

			// Clear username and enter invalid characters
			const usernameInput = screen.getByDisplayValue('jim_halpert');
			await user.clear(usernameInput);
			await user.type(usernameInput, '!!');

			// Submit the form
			await user.click(screen.getByRole('button', { name: /save profile/i }));

			// Should show validation error (and be accessible)
			await vi.waitFor(() => {
				// accessible input
				expect(usernameInput).toHaveAccessibleName();
				expect(usernameInput).toHaveAttribute('aria-describedby', 'username-error');

				// visible error message
				const errorMessage = document.getElementById('username-error');
				expect(errorMessage).toBeInTheDocument();
				expect(errorMessage).toHaveTextContent('Username must be at least');
			});
		});

		it.skip('shows validation error for bio exceeding character limit', async () => {
			//todo: add character counter to textarea field to provide user feedback
			// and then test that feature here

			const profileInfo = createMockProfileInfo(); // Start with valid profile data
			const longBio = '';
			const { user } = renderProfileForm(profileInfo);

			const bioTextarea = screen.getByPlaceholderText('Bio for your profile');
			await user.type(bioTextarea, longBio);

			// Submit the form
			await user.click(screen.getByRole('button', { name: /save profile/i }));

			// Should show validation error (and be accessible)
			await vi.waitFor(() => {
				const errorMessage = document.getElementById('userBio-error');
				expect(errorMessage).toBeInTheDocument();
			});
		});
	});

	describe('Form State Management', () => {
		it('updates form values when profile info changes', () => {
			const initialProfile = createMockProfileInfo();
			const { rerender } = renderProfileForm(initialProfile);

			expect(screen.getByDisplayValue('jim_halpert')).toBeInTheDocument();

			// Update profile info
			const updatedProfile = createMockProfileInfo({
				username: 'dwight_schrute',
				trailName: 'Beet Farmer',
			});

			rerender(
				<ProfileForm
					profileInfo={updatedProfile}
					socialLinks={createMockSocialLinks()}
				/>,
			);

			expect(screen.getByDisplayValue('dwight_schrute')).toBeInTheDocument();
			expect(screen.getByDisplayValue('Beet Farmer')).toBeInTheDocument();
		});
	});
});
