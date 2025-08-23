import { z } from 'zod';
import {
	string50,
	string250,
	requiredString50,
	urlSchema,
	priceSchema,
	quantitySchema,
	weightSchema,
} from './common-schemas';

// Pack schemas
export const packNameSchema = requiredString50;
export const packUrlNameSchema = string50;
export const packDescriptionSchema = string250;
export const packUrlSchema = urlSchema;
export const packAffiliateDescriptionSchema = string250;

// Pack tag schemas
export const packLocationTagSchema = string50;
export const packDurationTagSchema = string50;
export const packSeasonTagSchema = string50;
export const packDistanceTagSchema = string50;

// Pack category schemas
export const packCategoryNameSchema = string50;

// Pack item schemas
export const packItemNameSchema = z
	.string()
	.trim()
	.max(50, { message: 'Item name has a max of 50 characters.' })
	.optional()
	.or(z.literal(''));

export const packItemDescriptionSchema = z
	.string()
	.trim()
	.max(150, { message: 'Item description has a max of 150 characters.' })
	.nullish()
	.or(z.literal(''));
export const packItemUrlSchema = urlSchema;

// Import pack URL validation for LighterPack
export const packImportUrlSchema = z
	.string()
	.trim()
	.refine((val) => val.includes('https://lighterpack.com/r/'), {
		message: 'Please include a valid pack URL we can import.',
	});

// Pack schema objects

export const packFormSchema = z.object({
	packName: packNameSchema,
	packDescription: packDescriptionSchema,
	packUrlName: packUrlNameSchema,
	packUrl: packUrlSchema,
	packAffiliateDescription: packAffiliateDescriptionSchema,
	packLocationTag: packLocationTagSchema,
	packDurationTag: packDurationTagSchema,
	packSeasonTag: packSeasonTagSchema,
	packDistanceTag: packDistanceTagSchema,
});

export const tablePackItemSchema = z.object({
	packItemName: packItemNameSchema,
	packItemDescription: packItemDescriptionSchema,
	packItemWeight: weightSchema,
	packItemQuantity: quantitySchema,
	packItemPrice: priceSchema,
});
