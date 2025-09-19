import { createTheme } from "@mui/material/styles";

export const getTheme = (mode: "light" | "dark") =>
    createTheme({
        palette: { mode },
        components: {
            MuiButton: {
                styleOverrides: {
                    root: {
                        textTransform: "none", 
                        fontWeight: "bold", 
                        borderRadius: 12,    
                    },
                },
            },
        },
    });
