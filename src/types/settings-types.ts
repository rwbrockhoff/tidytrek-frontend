import { type PaletteName } from '@/styles/palette/palette-constants';

export type Settings = {
	darkMode: boolean;
	publicProfile: boolean;
	weightUnit: 'metric' | 'imperial';
	currencyUnit: string;
	palette: PaletteName;
};
