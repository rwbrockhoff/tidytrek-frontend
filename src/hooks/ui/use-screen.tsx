import { useContext } from "react";
import { ScreenContext } from "@/contexts/screen-context";

export const useScreen = () => useContext(ScreenContext);