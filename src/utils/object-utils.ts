// Shallow comparison utility for React.memo
// Compares properties of two objects

export const shallowEqual = <T extends Record<string, any>>(
	obj1: T,
	obj2: T,
): boolean => {
	const keys1 = Object.keys(obj1);
	const keys2 = Object.keys(obj2);

	// Not the same length
	if (keys1.length !== keys2.length) return false;

	// Return boolean if every property is equal (shallow comparison)
	return keys1.every((key) => obj1[key] === obj2[key]);
};
