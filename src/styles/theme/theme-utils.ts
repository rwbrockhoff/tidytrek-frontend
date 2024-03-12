import { InitialState as GuestQueryState } from '../../queries/guestQueries';
import { InitialState as PackQueryState } from '../../types/pack-types';
import { useMemo } from 'react';
import {
	type ThemeColor,
	type Settings,
	type UserTheme,
} from '../../types/settings-types';
import { tidyTheme } from './tidy-theme';
import * as mixins from '../mixins';

export const createTheme = (settings: Settings | undefined) => {
	let userTheme: UserTheme = {};
	if (settings && settings.themeColors) {
		settings.themeColors.map(({ themeColorName, themeColor }: ThemeColor) => {
			userTheme[themeColorName] = themeColor;
		});
	} else return { tidy: tidyTheme, mx: mixins };
	return { tidy: tidyTheme, user: userTheme, mx: mixins };
};

export const getThemeAsGuest = (data: PackQueryState | GuestQueryState | undefined) => {
	return useMemo(() => (isGuestData(data) ? createTheme(data.settings) : {}), [data]);
};

export const getTheme = (settings: Settings | undefined) => {
	return useMemo(() => (settings !== undefined ? createTheme(settings) : {}), [settings]);
};

export const isGuestData = (
	data: PackQueryState | GuestQueryState | undefined,
): data is GuestQueryState => {
	return (data && 'settings' in data) || false;
};
