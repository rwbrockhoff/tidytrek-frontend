import { useParams } from 'react-router-dom';
import { useGetPackQuery } from '@/queries/pack-queries';
import { useViewPackQuery } from '@/queries/guest-queries';
import { useGetAuth } from '@/hooks/auth/use-get-auth';
import { useGuestRoute } from '@/hooks/routing/use-route-context';
import { PaletteName, DEFAULT_PALETTE } from '@/styles/palette/palette-constants';
import { decode } from '@/utils';
import { useGuestData } from './use-guest-data';
import { Settings } from '@/types/settings-types';
import { WeightUnit } from '@/types/pack-types';

/**
 * Provides pack settings context for palette, weight units, and currency.
 * Handles guest/creator routes and applies the correct settings.
 *
 * @returns Pack context with palette, weight units, currency, and route info
 */
export const usePackContext = () => {
	const { packId: paramPackId } = useParams();
	const { settings: viewerSettings } = useGetAuth();
	const isGuestRoute = useGuestRoute();

	// Decode packId for user routes (needs number)
	const decodedPackId = paramPackId && !isGuestRoute ? decode(paramPackId) : null;

	const { data: userPack } = useGetPackQuery(decodedPackId);
	const { data: guestPack } = useViewPackQuery(isGuestRoute ? paramPackId : undefined);

	const currentPack = isGuestRoute ? guestPack : userPack;
	const pack = currentPack?.pack;
	const { settings: creatorSettings } = useGuestData(currentPack);

	// For guest view -> use pack creator's settings
	// for creator view -> use viewer's settings
	const settings: Settings | null =
		isGuestRoute && creatorSettings ? creatorSettings : viewerSettings;

	// Palette
	const userDefaultPalette = settings?.palette || DEFAULT_PALETTE;
	const palette: PaletteName = pack?.palette || userDefaultPalette;

	// Weight unit
	const isMetric = settings?.weightUnit === 'metric';
	const weightUnit = {
		base: (isMetric ? WeightUnit.kg : WeightUnit.lb) as WeightUnit,
		detail: (isMetric ? WeightUnit.g : WeightUnit.oz) as WeightUnit,
		isMetric,
	};

	// Currency
	const currency = settings?.currencyUnit || 'USD';

	return {
		palette,
		weightUnit,
		currency,
		settings,
		isGuestView: isGuestRoute,
	};
};
