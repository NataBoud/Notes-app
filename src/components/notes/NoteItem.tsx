import { Card, Stack, Typography, useTheme } from "@mui/material";
import type { NoteInterface } from "../../interfaces/NoteInterface";
import  NoteActions from "./NoteActions";

interface NoteItemProps {
  note: NoteInterface;
}

export default function NoteItem({ note }: NoteItemProps) {
  const theme = useTheme();

  return (
    <Card sx={{ p: 2, border: `1px solid ${theme.palette.divider}`, borderRadius: 4, boxShadow: theme.palette.mode === "light" ? 1 : 3, display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "start",}} >
      <Stack>
        <Typography variant="h6">{note.title}</Typography>
        <Typography variant="body1" color="text.secondary">{note.content}</Typography>
      </Stack>

      <Stack direction="row" justifyContent="space-between"alignItems="center" sx={{ width: "100%" }}>
        <Typography variant="caption" color="text.secondary" sx={{ pt: 2 }}>Ajoutée le : {new Date(note.createdAt).toLocaleString()}</Typography>
        <NoteActions note={note}/>
      </Stack>

    </Card>
  );
}
