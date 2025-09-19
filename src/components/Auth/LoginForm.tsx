import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginRequest } from "../../api/authApi";
import { loginSuccess } from "../../store/authSlice";

import { Button, TextField, Typography, Stack, Card, Box } from "@mui/material";

export default function LoginForm() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

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
        <Card sx={{ p: 3 }}>
            <Typography variant="h5" mb={2}>Connexion</Typography>
            {error && <Typography color="error" mb={1}>{error}</Typography>}
            <form onSubmit={handleSubmit}>
                <Stack spacing={2}>
                    <TextField label="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
                    <TextField label="Mot de passe" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Button type="submit" variant="contained" sx={{ mt: 2 }}>Se connecter</Button>
                        <Button type="button" variant="text" sx={{ mt: 2 }} onClick={() => navigate("/register")}>Pas encore de compte ?</Button>
                    </Box>
                </Stack>
            </form>
        </Card>
    );
}
