import Hashids from 'hashids';

const hashids = new Hashids('tidytrekpack', 6);
const packItemHashids = new Hashids('tidytrekpackitem', 6);

export const encode = (packId: number | undefined) => {
	if (packId === undefined) return '';
	return hashids.encode(packId);
};

export const decode = (displayId: string) => {
	const decodedId = hashids.decode(displayId);
	return Number(decodedId[0]);
};

export const encodePackItemId = (packItemId: number) => {
	return packItemHashids.encode(packItemId);
};

export const decodePackItemId = (displayId: string) => {
	const decodedId = packItemHashids.decode(displayId);
	return Number(decodedId[0]);
};
