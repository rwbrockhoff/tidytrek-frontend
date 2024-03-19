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
