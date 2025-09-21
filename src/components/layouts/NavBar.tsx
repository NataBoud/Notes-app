import { useState } from "react";
import { AppBar, Toolbar, IconButton, Button, Box, Tooltip, Stack, Drawer, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../store/store";
import { logout } from "../../store/authSlice";
import { useThemeMode } from "../../hooks/useThemeMode";

const navLinkStyle = {
    textTransform: "none",
    "&.active": { color: "primary.main", fontWeight: "bold" },
    "&:not(.active)": { color: "text.secondary" },
};

export default function NavBar() {
    const token = useSelector((state: RootState) => state.auth.token);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { mode, toggleMode } = useThemeMode();

    const handleLogout = () => {
        dispatch(logout());
        window.location.href = "/";
    };

    // État pour Drawer mobile
    const [mobileOpen, setMobileOpen] = useState(false);
    const handleDrawerToggle = () => setMobileOpen(prev => !prev);

    // Liens du menu
    const menuLinks = [
        { label: "Accueil", to: "/" },
        { label: "À propos", to: "/a-propos" },
        ...(token ? [{ label: "Mes Notes", to: "/notes" }] : []),
    ];

    return (
        <>
            <AppBar position="fixed"  elevation={1} sx={{ width: '100%' }}>
                <Toolbar sx={{ display: "flex", justifyContent: "space-between", maxWidth: 1200, mx: "auto", width: '100%' }}>
                    <Stack direction="row" alignItems="center" spacing={1}>
                        {/* Menu gauche desktop */}
                        <Box sx={{ display: { xs: "none", sm: "flex" }, gap: 1 }}>
                            {menuLinks.map(link => (
                                <Button key={link.to} component={NavLink} to={link.to} sx={navLinkStyle}>
                                    {link.label}
                                </Button>
                            ))}
                        </Box>

                        {/* Hamburger menu mobile */}
                        <IconButton
                            sx={{ display: { xs: "flex", sm: "none" }, ml: "0 !important" }}
                            color="primary"
                            onClick={handleDrawerToggle}
                        >
                            <MenuIcon />
                        </IconButton>
                    </Stack>

                    {/* Menu droite */}
                    <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                        <Tooltip title={mode === "dark" ? "Passer en clair" : "Passer en sombre"}>
                            <IconButton onClick={toggleMode} color="primary">
                                {mode === "dark" ? <LightModeOutlinedIcon /> : <DarkModeOutlinedIcon />}
                            </IconButton>
                        </Tooltip>

                        {token && (
                            <Button variant="outlined" color="primary" onClick={() => { navigate("/"); handleLogout(); }}>
                                Déconnexion
                            </Button>
                        )}
                        {!token && (
                            <Button component={NavLink} to="/login" variant="outlined" color="primary">
                                Se connecter
                            </Button>
                        )}
                    </Box>
                </Toolbar>
            </AppBar>

            {/* Drawer mobile */}
            <Drawer
                anchor="left"
                open={mobileOpen}
                onClose={handleDrawerToggle}
            >
                <List>
                    {menuLinks.map(link => (
                        <ListItem key={link.to} disablePadding>
                            <ListItemButton
                                component={NavLink}
                                to={link.to}
                                onClick={handleDrawerToggle}
                            >
                                <ListItemText primary={link.label} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        </>
    );
}
