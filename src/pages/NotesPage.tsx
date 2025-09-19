import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { Card, Paper, Stack, Typography, useTheme, IconButton, Box } from "@mui/material";
import PagesLayout from "../components/layouts/PagesLayout";
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { deleteNote } from "../store/notesSlice";

export default function NotesPage() {
  const notes = useSelector((state: RootState) => state.notes);
  const theme = useTheme();
  const dispatch = useDispatch();

  const handleDelete = (id: string) => {
    dispatch(deleteNote(id));
  };

  return (
    <PagesLayout>
      <Paper elevation={4} sx={{ p: 4, borderRadius: 4, border: `1px solid ${theme.palette.divider}`, boxShadow: 6 }}>
        <Typography variant="h4" mb={3}>Mes Notes</Typography>
        <Stack spacing={2}>
          {notes.map((n) => (
            <Card key={n.id} sx={{ p: 2, border: `1px solid ${theme.palette.divider}`, borderRadius: 4, boxShadow: 2, display: "flex", flexDirection: 'row', justifyContent: 'space-between' }}>

              <Stack>
                <Typography variant="body1">{n.note}</Typography>
                <Typography variant="caption" color="text.secondary">
                  Ajoutée le : {new Date(n.dateAjout).toLocaleString()}
                </Typography>

              </Stack>

              <Box sx={{}}>
                <IconButton color="primary" size="small" aria-label="edit note">
                  <ModeEditOutlineOutlinedIcon />
                </IconButton>
                <IconButton color="error" size="small" aria-label="delete note" onClick={() => handleDelete(n.id)}>
                  <DeleteOutlineOutlinedIcon />
                </IconButton>
              </Box>
            </Card>
          ))}
        </Stack>

      </Paper>

    </PagesLayout>
  );
}
