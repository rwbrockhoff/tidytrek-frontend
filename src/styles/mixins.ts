import { css } from 'styled-components';
import { type ThemeColorName } from '../types/settingsTypes';
import { TidyThemeColorName } from './theme/tidy-theme';

// export const fontSize = (size: number, base = 16) => `
//   font-size: ${size}px; // older browsers fallback
//   font-size: calc(${size / base} * 1rem);
// `;
type ThemeName = 'tidy' | 'user';

export const fontSize = (size: number, base = 16) => `
  font-size: ${size * base}px; // older browsers fallback
  font-size: calc(${size} * 1rem);
`;

export const wh = (w: string, h = w) => `
  width: ${w};
  height: ${h};
`;

export const flexCenter = () => `
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const absoluteCenter = () => `
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const mobile = (customCss: string) => css`
	@media only screen and (max-width: 768px) {
		${customCss}
	}
`;

export const themeColor = (
	color: ThemeColorName | TidyThemeColorName,
	themeName: ThemeName = 'user',
) => css`
	color: ${({ theme: t }) => {
		return t[themeName] !== undefined ? t[themeName][color] : t.tidy.tidyPrimary;
	}};
`;

export const themeBgColor = (
	color: ThemeColorName | TidyThemeColorName,
	themeName: ThemeName = 'user',
) => css`
	background-color: ${(props) => props.theme[themeName][color] || 'inherit'};
`;
