import { useState, useEffect } from "react";

const MOBILE_BREAKPOINT = 768;
const MEDIUM_BREAKPOINT = 1280;

export function useCheckScreen() {
  const [screenState, setScreenState] = useState(() => {
    if (typeof window === "undefined") {
      return { isMobile: false, isMedium: false };
    }
    const width = window.innerWidth;
    return {
      isMobile: width <= MOBILE_BREAKPOINT,
      isMedium: width <= MEDIUM_BREAKPOINT,
    };
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setScreenState({
        isMobile: width <= MOBILE_BREAKPOINT,
        isMedium: width <= MEDIUM_BREAKPOINT,
      });
    };
    
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return screenState;
}