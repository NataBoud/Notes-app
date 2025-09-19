import {  Typography, Stack } from "@mui/material";

export default function HomePage() {

    return (
        <>
            <div className="container">
                <Stack sx={{ width: '100%', maxWidth: '800px', margin: '0 auto', px: 3 }}>
                    <Typography variant="h4" mb={2}>Notes Aplication</Typography>
                </Stack>
            </div>
        </>

    );
}
