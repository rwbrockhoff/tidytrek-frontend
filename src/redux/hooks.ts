import { useDispatch as useReduxDispatch } from 'react-redux';
import type { AppDispatch } from './store';
// import type { Pack, PackItem } from "./packs/packTypes"

export const useDispatch: () => AppDispatch = useReduxDispatch;

// export const useAllItems = (): Item[] => {
//   return useSelector<RootState, Item[]>((state) => Object.values(state.items));
// };

// export const useItems = (packed: boolean): Item[] => {
//   return useSelector<RootState, Item[]>((state) =>
//     Object.values(state.items).filter((item) => item.packed === packed),
//   );
// };

// export const useItemIds = (packed: boolean): string[] => {
//   return useItems(packed).map(({ id }) => id);
// };

// export const useItem = (id: string): Item => {
//   return useSelector<RootState, Item>((state) => state.items[id]);
// };
