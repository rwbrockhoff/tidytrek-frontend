export type User = {
	userId: string;
	name: string;
	email: string;
	username: string;
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
