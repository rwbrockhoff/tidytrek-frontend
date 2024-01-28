import Hashids from 'hashids';

const hashids = new Hashids('tidytrekpack', 6);

export const encode = (packId: number) => {
	return hashids.encode(packId);
};

export const decode = (displayId: string) => {
	const decodedId = hashids.decode(displayId);
	return decodedId[0];
};
