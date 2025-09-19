import { useState, useMemo, type ReactNode } from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeModeContext } from "./ThemeContext";
import { getTheme } from "../theme/themeOverrides";

export function ThemeProviderCustom({ children }: { children: ReactNode }) {

    const [mode, setMode] = useState<"light" | "dark">("dark");
    const theme = useMemo(() => getTheme(mode), [mode]);
    const toggleMode = () => setMode(prev => (prev === "dark" ? "light" : "dark"));

    return (
        <ThemeModeContext.Provider value={{ mode, toggleMode }}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </ThemeModeContext.Provider>
    );
}
