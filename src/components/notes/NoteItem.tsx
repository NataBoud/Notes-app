import { Card, Stack, Typography, IconButton, Box, useTheme } from "@mui/material";
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';// adapte selon ton type
import { useDispatch } from "react-redux";
import { deleteNote } from "../../store/notesSlice";
import type { NoteInterface } from "../../interfaces/NoteInterface";
import { useNavigate } from "react-router-dom";

interface NoteItemProps {
  note: NoteInterface;
}

export default function NoteItem({ note }: NoteItemProps) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <Card
      sx={{
        p: 2,
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: 4,
        boxShadow: theme.palette.mode === "light" ? 1 : 3,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Stack>
        <Typography variant="h6">{note.title}</Typography>
        <Typography variant="body1" color="text.secondary">{note.content}</Typography>
        <Typography variant="caption" color="text.secondary">
          Ajoutée le : {new Date(note.createdAt).toLocaleString()}
        </Typography>
      </Stack>

      <Box sx={{ display: "flex", gap: 1 }}>
        <IconButton color="primary" size="small" onClick={() => navigate(`/notes/${note.id}`)}>
          <ModeEditOutlineOutlinedIcon />
        </IconButton>
        <IconButton color="error" size="small" onClick={() => dispatch(deleteNote(note.id))}>
          <DeleteOutlineOutlinedIcon />
        </IconButton>
      </Box>
    </Card>
  );
}
