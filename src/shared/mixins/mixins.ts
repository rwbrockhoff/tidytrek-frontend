import { css } from 'styled-components';
import { type ThemeColorName } from '../../types/settingsTypes';
import { TidyThemeColorName } from '../theme/tidyTheme';

export const fontSize = (size: number, base = 16) => `
  font-size: ${size}px; // older browsers fallback
  font-size: calc(${size / base} * 1rem);
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

export const mobile = (customCss: string) => css`
	@media only screen and (max-width: 768px) {
		${customCss}
	}
`;

export const themeColor = (color: ThemeColorName | TidyThemeColorName) => css`
	color: ${(props) => props.theme[color] || 'inherit'};
`;

export const themeBgColor = (color: ThemeColorName | TidyThemeColorName) => css`
	background-color: ${(props) => props.theme[color] || 'inherit'};
`;
