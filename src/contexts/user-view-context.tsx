import { createContext } from 'react';

// Context for determining if user is authenticated (vs guest view)
export const UserViewContext = createContext(false);