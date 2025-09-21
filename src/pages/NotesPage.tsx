import { Button, Stack, Typography } from "@mui/material";
import NoteList from "../components/notes/NoteList";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useNavigate } from "react-router-dom";

export default function NotesPage() {
  const navigate = useNavigate();

  return (
    <>
      <Stack sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center", mb: 2
      }}>
        <Typography variant="h5">Mes Notes</Typography>
        <Button type="submit" variant="contained" size="large" onClick={() => navigate("/notes/new")} endIcon={<AddCircleOutlineIcon />}>
          Nouvelle note
        </Button>
      </Stack>
      <NoteList />
    </>

  );
}
