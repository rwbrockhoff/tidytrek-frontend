export const FORM_SECTIONS = {
	INITIAL: 'initial',
	CONFIRMATION: 'confirmationForm',
	PASSWORD: 'passwordForm',
} as const;

export type FormSection = typeof FORM_SECTIONS[keyof typeof FORM_SECTIONS];
