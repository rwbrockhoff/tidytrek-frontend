import { InitialState as GuestQueryState } from '../../queries/guestQueries';
import { InitialState as PackQueryState } from '../../types/packTypes';
import { useMemo } from 'react';
import {
	type ThemeColor,
	type Settings,
	type UserTheme,
} from '../../types/settingsTypes';
import { tidyTheme } from './tidyTheme';

export const createTheme = (settings: Settings | undefined) => {
	let userTheme: UserTheme = {};
	if (settings && settings.themeColors) {
		settings.themeColors.map(({ themeColorName, themeColor }: ThemeColor) => {
			userTheme[themeColorName] = themeColor;
		});
	} else return tidyTheme;
	return { ...tidyTheme, ...userTheme };
};

export const getThemeAsGuest = (data: PackQueryState | GuestQueryState | undefined) => {
	return useMemo(() => (isGuestData(data) ? createTheme(data.settings) : {}), [data]);
};

export const isGuestData = (
	data: PackQueryState | GuestQueryState | undefined,
): data is GuestQueryState => {
	return (data && 'settings' in data) || false;
};
