import { useContext, createContext } from 'react';
export const UserViewContext = createContext(false);
export const useUserContext = () => useContext(UserViewContext);
