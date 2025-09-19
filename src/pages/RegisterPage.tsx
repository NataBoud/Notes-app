
import RegisterForm from '../components/RegisterForm'
import { Stack } from "@mui/material";

export default function RegisterPage() {
  return (
    <Stack sx={{ width: '100%', maxWidth: '800px', margin: '0 auto', px: 3 }}>
      <RegisterForm/>
    </Stack>
  )
}
