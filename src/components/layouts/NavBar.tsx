import { Button } from "@mui/material";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../store/store";
import { logout } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";

export default function NavBar() {
    const token = useSelector((state: RootState) => state.auth.token);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return (
        <nav style={{ display: "flex", gap: "1rem", padding: "1rem", width: "100%", maxWidth: "800px", margin: "1rem auto" }}>
            <Button
                component={NavLink}
                to="/"
                sx={{ textTransform: "none", "&.active": { color: "primary.main", fontWeight: "bold" }, "&:not(.active)": { color: "text.secondary" } }}
            >
                Accueil
            </Button>

            <Button
                component={NavLink}
                to="/a-propos"
                sx={{ textTransform: "none", "&.active": { color: "primary.main", fontWeight: "bold" }, "&:not(.active)": { color: "text.secondary" } }}
            >
                À propos
            </Button>

            {!token && <Button
                component={NavLink}
                to="/register"
                sx={{ textTransform: "none", "&.active": { color: "primary.main", fontWeight: "bold" }, "&:not(.active)": { color: "text.secondary" } }}
            >
                Se connecter
            </Button>
            }

            {token && <Button
                component={NavLink}
                to="/notes"
                sx={{ textTransform: "none", "&.active": { color: "primary.main", fontWeight: "bold" }, "&:not(.active)": { color: "text.secondary" } }}
            >
                Mes Notes
            </Button>
            }
            {token && <Button variant="outlined" color="secondary" onClick={() => { dispatch(logout()); navigate("/login"); }}>Déconnexion</Button>}
        </nav>
    );
}
