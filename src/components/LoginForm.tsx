import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginRequest } from "../api/authApi";
import { loginSuccess } from "../store/authSlice";
import { useEffect } from "react";
import type { RootState } from "../store/store";
import { Button, TextField, Typography, Stack, Card, Box } from "@mui/material";

export default function LoginForm() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = useSelector((state: RootState) => state.auth.token);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        if (token) {
            // Dès que token est présent dans le store → navigue vers /notes
            navigate("/notes", { replace: true });
        }
    }, [token, navigate]);


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        try {
            const data = await loginRequest({ email, password });
            
            dispatch(loginSuccess({ email, token: data.accessToken }));
            navigate("/notes");
        } catch (err) {
            setError((err as Error).message);
        }
    };

    return (
        <Card sx={{ p: 3}}>
            <Typography variant="h5" mb={2}>Connexion</Typography>
            {error && <Typography color="error" mb={1}>{error}</Typography>}
            <form onSubmit={handleSubmit}>
                <Stack spacing={2}>
                    <TextField label="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
                    <TextField label="Mot de passe" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Button type="submit" variant="contained">Se connecter</Button>
                        <Button type="button" variant="text" onClick={() => navigate("/register")}>Pas encore de compte ?</Button>
                    </Box>
                </Stack>
            </form>
        </Card>
    );
}
