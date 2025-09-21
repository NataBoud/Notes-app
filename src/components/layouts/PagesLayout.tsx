import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import { Stack, Toolbar } from "@mui/material";

export default function AppLayout() {
    return (
        <>
            <NavBar />
            {/* Décalage pour AppBar fixed */}
            <Toolbar />

            <main>
                <Stack sx={{ maxWidth: 1200, mx: "auto", px: 3, py: 4 }}>
                    <Outlet />
                </Stack>
            </main>
        </>
    );
}
