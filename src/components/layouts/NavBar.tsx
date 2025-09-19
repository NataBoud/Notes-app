import { Button, IconButton, Tooltip } from "@mui/material";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../store/store";
import { logout } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
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
        // force reload pour contourner PrivateRoute
        window.location.href = "/";
    };

    return (
        <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem",  maxWidth: "1200px", margin: "1rem auto" }}>
            {/* Groupe liens à gauche */}
            <div style={{ display: "flex", gap: "1rem" }}>
                <Button component={NavLink} to="/" sx={navLinkStyle}>Accueil</Button>
                <Button component={NavLink} to="/a-propos" sx={navLinkStyle}>À propos</Button>
                {token && <Button component={NavLink} to="/notes" sx={navLinkStyle}>Mes Notes</Button>}
            </div>

            {/* Boutons à droite */}
            <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                {/* Toggle theme */}
                <Tooltip title={mode === "dark" ? "Passer en clair" : "Passer en sombre"}>
                    <IconButton onClick={toggleMode} color="primary">
                        {mode === "dark" ? <LightModeOutlinedIcon /> : <DarkModeOutlinedIcon />}
                    </IconButton>
                </Tooltip>
                {!token && (
                    <Button component={NavLink} to="/register" variant="text" color="primary">S'enregistrer</Button>
                )}
                {token && (
                    <Button variant="outlined" color="primary" onClick={() => { navigate("/"); handleLogout(); }}>Déconnexion</Button>
                )}
                {!token && (
                    <Button component={NavLink} to="/login" variant="outlined" color="primary">Se connecter</Button>
                )}
            </div>
        </nav>

    );
}
