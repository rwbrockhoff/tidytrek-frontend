export type User = {
	userId: string;
	firstName: string;
	lastName: string;
	email: string;
	username: string;
	profilePhotoUrl: string;
};

export type RegisterUser = {
	firstName: string;
	lastName: string;
	username: string;
	email: string;
	password: string;
	confirmPassword: string;
	agreeToTerms: boolean;
};

export type UserNames = {
	firstName: string;
	username: string;
};
