import { z } from 'zod';

export const weightSchema = z.coerce
	.number({ invalid_type_error: 'Please include a valid number for pack weight.' })
	.nonnegative({ message: 'Make sure your pack weight is a positive number.' })
	.lte(10000, { message: 'Please include a valid weight for your pack item.' })
	.safe();

export const quantitySchema = z.coerce
	.number({ invalid_type_error: 'Please include a valid number for item quantity.' })
	.nonnegative({ message: 'Make sure your quantity is a positive number.' })
	.lte(100, { message: 'Please include a valid quantity for your pack item.' })
	.safe();

export const priceSchema = z.coerce
	.number({ invalid_type_error: 'Please include a valid price.' })
	.nonnegative({ message: 'Make sure your price is a positive number.' })
	.lte(10000, { message: 'Please include a valid price for your pack item.' })
	.safe();

export const basicInputSchema = (inputName: string, max?: number) => {
	return z
		.string()
		.trim()
		.min(2, { message: `${inputName} must be at least 2 characters.` })
		.max(max || 40, { message: `${inputName} has a maximum of ${max || 40} characters.` })
		.or(z.literal(''));
};