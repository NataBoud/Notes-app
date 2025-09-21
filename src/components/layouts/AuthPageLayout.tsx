import type { ReactNode } from "react";
import { Stack } from "@mui/material";

type AuthPageLayoutProps = {
    children: ReactNode;
};

export default function AuthPageLayout({ children }: AuthPageLayoutProps) {
    return (
        <main>
            <Stack sx={{ maxWidth: '800px', margin: '0 auto', py: 4}}>
                {children}
            </Stack>
        </main>
    );
}
