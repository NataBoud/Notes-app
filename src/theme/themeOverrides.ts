import { createTheme } from "@mui/material/styles";

export const getTheme = (mode: "light" | "dark") =>
    createTheme({
        palette: {
            mode,
            ...(mode === "light"
                ? {
                    background: {
                        default: "#f0f4f7ff",
                        paper: "#fbfdfdff",
                    },
                }
                : {
                    background: {
                        default: "#0f172a",
                        paper: "#020f24ff",
                    },
                }),
        },
        components: {
            MuiAppBar: {
                styleOverrides: {
                    root: {
                        background: mode === "light"
                            ? "linear-gradient(145deg, #ecf0f3ff 0%, #fbfbfcff 100%)"
                            : "linear-gradient(145deg, #080e1dff 0%, #131d2cff 100%)",
                    },
                },
            },
            
            MuiCssBaseline: {
                styleOverrides: {
                    body: {
                        background:
                            mode === "light"
                                ? "linear-gradient(140deg, #ecf0f3ff 0%, #fbfbfcff 50%, #ffffffff 100%)"
                                : "linear-gradient(140deg, #080e1dff 0%, #1e293b 100%)",
                        backgroundAttachment: "fixed",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                    },
                   
                },
            },
            MuiButton: {
                styleOverrides: {
                    root: {
                        textTransform: "none",
                        fontWeight: "bold",
                        borderRadius: 12,
                    },
                },
            },
            MuiTypography: {
                styleOverrides: {
                    h4: { fontWeight: 700 },
                    h5: { fontWeight: 700 },
                    h6: { fontWeight: 600 },
                    body1: { fontWeight: 500 },
                },
            },
            MuiPaper: {
                styleOverrides: {
                    root: ({ ownerState }) =>
                        ownerState.elevation
                            ? {
                                backgroundColor:
                                    mode === "light" ? ownerState.elevation >= 3 ? "#f8f9f9ff": "#ffffffff" : "#080e1dff",
                            }
                            : {},
                },
            },
            MuiDrawer: {
                defaultProps: {
                    slotProps: {
                        paper: {
                            sx: {
                                width: 240, // largeur par défaut du Drawer
                                background:
                                    mode === "dark"
                                        ? "linear-gradient(145deg, #080e1d 0%,#1e293b 100%)"
                                        : "linear-gradient(145deg, #dbe2e7 0%, #f0f4f7 100%)",
                                color: mode === "dark" ? "#fff" : "#000",
                            },
                        },
                    },
                },
            },

        },
    });
