const User = 'User';
const Pack = 'Pack';
const Packlist = 'Packlist';
const Closet = 'Closet';

export const userKeys = {
	all: [User] as const,
};

export const packKeys = {
	all: [Pack] as const,
	packId: (packId: number | null) => [Pack, packId] as const,
};

export const packListKeys = {
	all: [Packlist] as const,
};

export const closetKeys = {
	all: [Closet] as const,
};
