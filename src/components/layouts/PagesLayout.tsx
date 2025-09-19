import type { ReactNode } from "react";
import { Stack } from "@mui/material";

type PagesLayoutProps = {
    children: ReactNode;
};

export default function PagesLayout({ children }: PagesLayoutProps) {
    return (
        <main>
            <Stack sx={{ maxWidth: "1200px", margin: '0 auto', px: 3,py: 4}}>
                {children}
            </Stack>
        </main>
    );
}
