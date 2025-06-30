export type User = {
	userId: string;
	firstName: string;
	lastName: string;
	email: string;
	username: string;
	trailName: string;
	profilePhotoUrl: string;
};

export type RegisterUser = {
	userId: string;
	firstName: string;
	lastName: string;
	email: string;
	avatarUrl?: string | null;
	supabaseRefreshToken?: string;
};

// used for google login to gracefully handle
// non-registered users "signing up"
export type LoginUser = {
	email: string;
	userId: string;
	firstName?: string;
	lastName?: string;
	avatarUrl?: string | null;
	supabaseRefreshToken?: string;
};

export type RegisterUserFormData = {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
};

export type LoginUserFormData = {
	email: string;
	password: string;
};

export type UserNames = {
	firstName: string;
	username: string;
	trailName: string;
	userId: number;
};
