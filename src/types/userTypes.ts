export type User = {
	userId: string;
	name: string;
	email: string;
	username: string;
};

export type Settings = {
	darkTheme: boolean;
	publicProfile: boolean;
	topoBackground: boolean;
	weightUnit: string;
	themeColors: ThemeColor[];
};

export type ThemeColor = {
	themeId: number;
	themeColor: string;
	themeColorName: string;
};
