import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerRequest } from "../../api/authApi";
import { registerSuccess } from "../../store/authSlice";
import { Button, TextField, Typography, Stack, Card, Box } from "@mui/material";

export default function RegisterForm() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        if (password !== confirmPassword) {
            setError("Les mots de passe ne correspondent pas");
            return;
        }
        try {
            const data = await registerRequest({ email, password });
            dispatch(registerSuccess({ email: data.email, token: data.accessToken }));
            navigate("/notes");
        } catch (err) {
            setError((err as Error).message);
        }
    };

    return (
        <Card sx={{ p: 3 }}>
            <Typography variant="h5" mb={2}>Inscription</Typography>
            {error && <Typography color="error" mb={1}>{error}</Typography>}
            <form onSubmit={handleSubmit}>
                <Stack spacing={2}>
                    <TextField label="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
                    <TextField label="Mot de passe" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
                    <TextField label="Confirmer le mot de passe" type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Button type="submit" variant="contained" sx={{ mt: 2 }}>S’inscrire</Button>
                        <Button type="button" variant="text" sx={{ mt: 2 }} onClick={() => navigate("/login")}>Déjà un compte ?</Button>
                    </Box>
                </Stack>
            </form>
        </Card>
    );
}
