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
	themeColorName: ThemeColorName;
};

export type UserTheme = {
	[K in ThemeColorName]?: string | undefined;
};

export type ThemeColorName =
	| 'primary'
	| 'color-one'
	| 'color-two'
	| 'color-three'
	| 'color-four'
	| 'color-five'
	| 'color-six'
	| 'color-seven';
