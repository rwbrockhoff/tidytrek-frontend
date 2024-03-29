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
	firstName: string;
	lastName: string;
	username: string;
	trailName: string;
	email: string;
	password: string;
	confirmPassword: string;
	agreeToTerms: boolean;
};

export type UserNames = {
	firstName: string;
	username: string;
	trailName: string;
	userId: number;
};
