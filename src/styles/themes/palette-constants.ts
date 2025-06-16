export const paletteList = [
	'palette-primary',
	'palette-one',
	'palette-two',
	'palette-three',
	'palette-four',
	'palette-five',
	'palette-six',
	'palette-seven',
] as const;

export type PaletteColor = typeof paletteList[number];