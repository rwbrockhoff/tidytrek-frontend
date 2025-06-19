export const PALETTE_NAMES = ['earth-tones'] as const;

export type PaletteName = (typeof PALETTE_NAMES)[number];

export const paletteList = [
	'palette-01',
	'palette-02',
	'palette-03',
	'palette-04',
	'palette-05',
	'palette-06',
	'palette-07',
	'palette-08',
] as const;
// as const makes this "read only" and only accepts these palette string values

export type PaletteColor = (typeof paletteList)[number];
