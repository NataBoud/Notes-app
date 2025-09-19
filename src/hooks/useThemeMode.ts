import { useContext } from "react";
import { ThemeModeContext, type ThemeContextType } from "../context/ThemeContext";

export function useThemeMode(): ThemeContextType {
    const context = useContext(ThemeModeContext);
    if (!context) {
        throw new Error("useThemeMode doit être utilisé à l'intérieur de ThemeProviderCustom");
    }
    return context;
}
