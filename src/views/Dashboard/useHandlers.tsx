import { usePackMutations } from './usePackMutations';

import { createContext, useContext } from 'react';
import { UseMutationResult } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import {
	MovePackCategoryProps,
	MovePackItemProps,
	PackItem,
} from '../../types/packTypes';
import { cleanUpLink } from '../../shared/ui/CustomLinks';

type InternalMutation<T> = UseMutationResult<AxiosResponse<any, any>, Error, T, unknown>;

type Handlers = {
	addPackCategory: () => void;
	movePackCategory: () => void;
	editPackItem: (packItem: PackItem) => void;
};

type Mutations = {
	addPackCategory: InternalMutation<number>;
	movePackCategory: InternalMutation<MovePackCategoryProps>;
	movePackItem: InternalMutation<MovePackItemProps>;
	editPackItem: InternalMutation<{
		packInfo: { packItemId: number; packItem: PackItem };
	}>;
};

type HandlerData = { handlers: Handlers; mutations: Mutations };

const useCreateHandlers = () => {
	const mutations = usePackMutations();
	const { editPackItem } = mutations;

	const handleEditPackItem = (packItem: PackItem) => {
		const { packItemId } = packItem;
		const { packItemUrl } = packItem;
		const cleanUrl = cleanUpLink(packItemUrl);
		editPackItem.mutate({ packItemId, packItem: { ...packItem, packItemUrl: cleanUrl } });
	};

	const handlers = { editPackItem: handleEditPackItem };
	return { handlers, mutations };
};

export const HandlerContext = createContext<HandlerData | {}>({});

export const useHandlers = () => useContext(HandlerContext) as HandlerData;

export const HandlerWrapper = ({ children }: { children: React.ReactNode }) => {
	return (
		<HandlerContext.Provider value={useCreateHandlers()}>
			{children}
		</HandlerContext.Provider>
	);
};
