import { useParams } from 'react-router-dom';
import { useGetAuth } from './use-get-auth';
import { useGetPackQuery } from '@/queries/pack-queries';
import { decode } from '@/utils';

type UsePackOwnerOptions = {
	packId?: number | string | null;
	pack?: { userId: string };
};

type UsePackOwnerReturn = {
	isPackOwner: boolean;
	isLoading: boolean;
	packOwnerId: string | null;
};

export const usePackOwner = (options: UsePackOwnerOptions = {}): UsePackOwnerReturn => {
	const { user, isLoading: authLoading } = useGetAuth();
	const { packId: paramPackId } = useParams();

	// use passed packId or grab from URL
	const targetPackId = options.packId ?? (paramPackId ? decode(paramPackId) : null);

	// skip fetch if pack object already provided
	const { data: fetchedPack, isLoading: packLoading } = useGetPackQuery(
		options.pack ? null : typeof targetPackId === 'number' ? targetPackId : null,
	);

	const pack = options.pack || fetchedPack?.pack;
	const packOwnerId = pack?.userId || null;

	const isPackOwner = !!(user?.userId && packOwnerId && user.userId === packOwnerId);
	const isLoading = authLoading || (!options.pack && packLoading);

	return {
		isPackOwner,
		isLoading,
		packOwnerId,
	};
};
