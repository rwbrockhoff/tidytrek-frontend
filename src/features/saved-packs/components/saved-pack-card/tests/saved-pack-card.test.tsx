import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SavedPackCard } from '../saved-pack-card';
import { wrappedRender } from '@/tests/wrapper-utils';
import { encode } from '@/utils';
import type { SavedPack } from '@/types/saved-packs-types';

const mockSavedPack: SavedPack = {
	packId: 123,
	packName: 'Scranton Day Pack',
	packDescription: 'My pack to take mountain biking!',
	packPhotoUrl: 'https://dundermifflin.com/sales/jim/mountainbiking.jpg',
	username: 'testuser',
	profilePhotoUrl: 'https://dundermifflin.com/sales/jim/profile.jpg',
};

describe('SavedPackCard', () => {
	const mockOnRemoveBookmark = vi.fn();
	const defaultProps = {
		savedPack: mockSavedPack,
		onRemoveBookmark: mockOnRemoveBookmark,
		isPending: false,
	};

	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('should render pack information correctly', () => {
		wrappedRender(<SavedPackCard {...defaultProps} />);

		expect(screen.getByText('Scranton Day Pack')).toBeInTheDocument();
		expect(screen.getByText('My pack to take mountain biking!')).toBeInTheDocument();
		expect(screen.getByText('testuser')).toBeInTheDocument();
	});

	it('should render without description when not provided', () => {
		const packWithoutDescription = {
			...mockSavedPack,
			packDescription: null,
		};

		wrappedRender(<SavedPackCard {...defaultProps} savedPack={packWithoutDescription} />);

		expect(screen.getByText('Scranton Day Pack')).toBeInTheDocument();
		expect(
			screen.queryByText('My pack to take mountain biking!'),
		).not.toBeInTheDocument();
		expect(screen.getByText('testuser')).toBeInTheDocument();
	});

	it('should call onRemoveBookmark when bookmark button is clicked', async () => {
		const user = userEvent.setup();
		wrappedRender(<SavedPackCard {...defaultProps} />);

		const bookmarkButton = screen.getByRole('button');
		await user.click(bookmarkButton);

		expect(mockOnRemoveBookmark).toHaveBeenCalledWith(123);
	});

	it('should disable bookmark button when isPending is true', () => {
		wrappedRender(<SavedPackCard {...defaultProps} isPending={true} />);

		const bookmarkButton = screen.getByRole('button');
		expect(bookmarkButton).toBeDisabled();
		expect(bookmarkButton).toHaveAttribute('aria-disabled', 'true');
	});

	it('should have correct link to pack page', () => {
		wrappedRender(<SavedPackCard {...defaultProps} />);

		const link = screen.getByRole('link');
		const expectedLink = `/pk/${encode(123)}`;
		expect(link).toHaveAttribute('href', expectedLink);
	});
});
