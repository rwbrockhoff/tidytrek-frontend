import type { User, LoginUser } from '@/types/user-types';
import type { Settings } from '@/types/settings-types';
import type { AuthStatusResponse } from '@/queries/user-queries';
import { DEFAULT_PALETTE } from '@/styles/palette/palette-constants';

// Generates expected data to match our type definitions
// while allowing us to pass in specific data for testing

export const createMockUser = (overrides?: Partial<User>): User => ({
	userId: '1',
	firstName: 'Test',
	lastName: 'User',
	email: 'test@example.com',
	username: 'testuser',
	trailName: 'Test Trail',
	profilePhotoUrl: 'https://example.com/photo.jpg',
	...overrides,
});

export const createMockLoginUser = (overrides?: Partial<LoginUser>): LoginUser => ({
	email: 'test@example.com',
	userId: '1',
	firstName: 'Test',
	lastName: 'User',
	avatarUrl: 'https://example.com/avatar.jpg',
	supabaseRefreshToken: 'mock_refresh_token',
	...overrides,
});

export const createMockSettings = (overrides?: Partial<Settings>): Settings => ({
	darkMode: false,
	palette: DEFAULT_PALETTE,
	publicProfile: true,
	weightUnit: 'lb',
	...overrides,
});

export const createMockAuthResponse = (
	overrides?: Partial<AuthStatusResponse>,
): AuthStatusResponse => ({
	isAuthenticated: true,
	user: createMockUser(),
	settings: createMockSettings(),
	...overrides,
});
