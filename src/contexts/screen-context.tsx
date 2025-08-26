import { createContext, useMemo } from "react";
import { useCheckScreen } from "@/hooks/ui/use-check-screen";

type ScreenContextValue = { isMobile: boolean; isMedium: boolean };
export const ScreenContext = createContext<ScreenContextValue>({ isMobile: false, isMedium: false });

export const ScreenProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const screenState = useCheckScreen();
  const value = useMemo(() => screenState, [screenState]);

  return <ScreenContext.Provider value={value}>{children}</ScreenContext.Provider>;
};