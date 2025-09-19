import { Typography, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function NotFoundPage() {

    const navigate = useNavigate();
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "70vh",
                textAlign: "center",
            }}
        >
            <Typography variant="h3" color="primary" sx={{ mb: 2 }}>
                404
            </Typography>
            <Typography variant="h6" sx={{ mb: 4 }}>
                Oups ! La page que vous recherchez n’existe pas.
            </Typography>
            <Button variant="outlined" color="primary" onClick={() => navigate("/")}>
                Retour à l'accueill
            </Button>
        </Box>
    );
}
