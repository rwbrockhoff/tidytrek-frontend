import {
	type CheckboxEvent,
	type InputEvent,
	type TextAreaEvent,
} from '../types/formTypes';

export const isInputEvent = (e: InputEvent | CheckboxEvent): e is InputEvent => {
	return e.type === 'change' || false;
};

export function setFormInput<T>(
	e: InputEvent | TextAreaEvent,
	setState: React.Dispatch<React.SetStateAction<T>>,
) {
	setState((prevFormData) => ({
		...prevFormData,
		[e.target.name]: e.target.value,
	}));
}

export function searchMatch(search: string, name: string, conditions: string) {
	const searchInput = search.replace(/\s/g, '').trim();
	const item = name.replace(/\s/g, '').trim();

	const mustHave = new RegExp(searchInput, conditions);

	return mustHave.test(item.trim());
}
