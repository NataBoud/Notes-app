import { createContext } from "react";

export type ThemeContextType = {
    mode: "light" | "dark";
    toggleMode: () => void;
};

export const ThemeModeContext = createContext<ThemeContextType | undefined>(undefined);

