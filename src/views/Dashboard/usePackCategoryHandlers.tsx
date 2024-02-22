import { usePackCategoryMutations } from './usePackCategoryMutations';
import { createContext, useContext } from 'react';
import { UseMutationResult } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { MovePackCategoryProps } from '../../types/packTypes';

type InternalMutation<T> = UseMutationResult<AxiosResponse<any, any>, Error, T, unknown>;

type Handlers = {
	addPackCategory: () => void;
	movePackCategory: () => void;
};

type Mutations = {
	addPackCategory: InternalMutation<number>;
	movePackCategory: InternalMutation<MovePackCategoryProps>;
};

type HandlerData = { handlers: Handlers; mutations: Mutations };

const useCreateHandlers = () => {
	const mutations = usePackCategoryMutations();

	const handlers = {};
	return { handlers, mutations };
};

export const HandlerContext = createContext<HandlerData | {}>({});

export const usePackHandlers = () => useContext(HandlerContext) as HandlerData;

export const HandlerWrapper = ({ children }: { children: React.ReactNode }) => {
	return (
		<HandlerContext.Provider value={useCreateHandlers()}>
			{children}
		</HandlerContext.Provider>
	);
};
