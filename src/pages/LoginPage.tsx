import { Stack } from "@mui/material";
import LoginForm from "../components/LoginForm";

export default function LoginPage() {
  return (
    <Stack sx={{ width: '100%', maxWidth: '800px', margin: '0 auto', px: 3 }}>
      <LoginForm />
    </Stack>
  )
}
