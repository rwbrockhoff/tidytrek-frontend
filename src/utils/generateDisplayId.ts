import { Base64 } from 'js-base64';

export const encode = (packId: number) => {
	return Base64.encodeURI(`p${packId}`);
};

export const decode = (displayId: string) => {
	const rawId = Base64.decode(displayId);
	return Number(rawId.slice(1));
};
