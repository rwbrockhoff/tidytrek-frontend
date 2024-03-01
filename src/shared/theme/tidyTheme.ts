export type TidyThemeColorName = 'tidyPrimary' | 'tidyLightGrey' | 'tidyBlue';

type TidyTheme = { [K in TidyThemeColorName]: string };

export const tidyTheme: TidyTheme = {
	tidyLightGrey: '#f0f0f0',
	tidyPrimary: '#338866',
	tidyBlue: '#2185d0',
};
