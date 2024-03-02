export type TidyThemeColorName = 'tidyPrimary' | 'tidyBg' | 'tidyLightGrey' | 'tidyBlue';

type TidyTheme = { [K in TidyThemeColorName]: string };

export const tidyTheme: TidyTheme = {
	tidyBg: '#f0f0f0',
	tidyLightGrey: '#f0f0f0',
	tidyPrimary: '#338866',
	tidyBlue: '#2185d0',
};
