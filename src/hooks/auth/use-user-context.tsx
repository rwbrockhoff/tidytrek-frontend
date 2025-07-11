import { useContext } from 'react';
import { UserViewContext } from '@/contexts/user-view-context';

// Hook for consuming the user view context (auth state)
export const useUserContext = (): boolean => useContext(UserViewContext);