import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { Card, Typography, Stack } from "@mui/material";

export default function NotesPage() {
  const notes = useSelector((state: RootState) => state.notes);

  return (
    <div>
      
      <Stack spacing={2} sx={{ width: '100%', maxWidth: '800px', margin: '0 auto', px: 3 }}>
        <Typography variant="h4" mb={2}>Mes Notes</Typography>
        {notes.map((n) => (
          <Card key={n.id} sx={{ p: 2 }}>
            <Typography variant="body1">{n.note}</Typography>
            <Typography variant="caption" color="text.secondary">Ajoutée le : {new Date(n.dateAjout).toLocaleString()}</Typography>
          </Card>
        ))}
      </Stack>
    </div>
  );
}
