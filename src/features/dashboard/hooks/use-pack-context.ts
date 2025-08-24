import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useGetPackQuery } from '@/queries/pack-queries';
import { useViewPackQuery } from '@/queries/guest-queries';
import { useAuth } from '@/hooks/auth/use-auth';
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
	const { settings: viewerSettings } = useAuth();
	const isGuestRoute = useGuestRoute();

	// Determine if this is a pack-related route
	const isPackRoute = Boolean(paramPackId) || isGuestRoute;

	// Decode packId for user routes (needs number)
	const decodedPackId = paramPackId && !isGuestRoute ? decode(paramPackId) : null;

	// Only run queries for pack routes with valid IDs
	const shouldFetchUserPack = !isGuestRoute && !!decodedPackId && isPackRoute;
	const shouldFetchGuestPack = isGuestRoute && !!paramPackId && isPackRoute;

	const { data: userPack } = useGetPackQuery(decodedPackId, {
		enabled: shouldFetchUserPack,
	});
	const { data: guestPack } = useViewPackQuery(isGuestRoute ? paramPackId : undefined, {
		enabled: shouldFetchGuestPack,
	});

	const currentPack = isGuestRoute ? guestPack : userPack;
	const pack = currentPack?.pack;
	const { settings: creatorSettings } = useGuestData(currentPack);

	// Extract only the values we need to avoid unnecessary re-renders
	const packPalette = pack?.palette;

	// Memoize the result to prevent object recreation
	return useMemo(() => {
		// Early exit for non-pack routes
		if (!isPackRoute) {
			return {
				palette: viewerSettings?.palette || DEFAULT_PALETTE,
				weightUnit: {
					base: (viewerSettings?.weightUnit === 'metric'
						? WeightUnit.kg
						: WeightUnit.lb) as WeightUnit,
					detail: (viewerSettings?.weightUnit === 'metric'
						? WeightUnit.g
						: WeightUnit.oz) as WeightUnit,
					isMetric: viewerSettings?.weightUnit === 'metric',
				},
				currency: viewerSettings?.currencyUnit || 'USD',
				settings: viewerSettings,
				isGuestView: false,
			};
		}

		// For guest view -> use pack creator's settings
		// for creator view -> use viewer's settings
		const settings: Settings | null =
			isGuestRoute && creatorSettings ? creatorSettings : viewerSettings;

		// Palette
		const userDefaultPalette = settings?.palette || DEFAULT_PALETTE;
		const palette: PaletteName = packPalette || userDefaultPalette;

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
	}, [isPackRoute, viewerSettings, isGuestRoute, packPalette, creatorSettings]);
};
