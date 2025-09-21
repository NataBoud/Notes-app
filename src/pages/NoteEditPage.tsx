import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TextField, Button, Stack, Typography, Card, useTheme } from "@mui/material";
import { useDispatch } from "react-redux";
import { updateNote } from "../store/notesSlice";
import type { NoteInterface } from "../interfaces/NoteInterface";
import { fetchNoteById, updateNoteRequest } from "../api/noteApi";

export default function NoteEditPage() {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();

  const [note, setNote] = useState<NoteInterface | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingNote, setLoadingNote] = useState(true);

  // Charger la note depuis le backend
  useEffect(() => {
    const loadNote = async () => {
      try {
        if (!id) return;
        const token = localStorage.getItem("token") || "";
        const data = await fetchNoteById(id, token);
        setNote(data);
        setTitle(data.title);
        setContent(data.content);
      } catch (err) {
        console.error(err);
        setNote(null);
      } finally {
        setLoadingNote(false);
      }
    };

    loadNote();
  }, [id]);

  // Mettre à jour la note
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id || !title.trim() || !content.trim()) return;

    setLoading(true);
    try {
      const token = localStorage.getItem("token") || "";
      const updatedNote = await updateNoteRequest(id, { title, content }, token);

      dispatch(updateNote({
        id: updatedNote.id.toString(),
        title: updatedNote.title,
        content: updatedNote.content
      }));

      navigate("/notes");
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la mise à jour de la note.");
    } finally {
      setLoading(false);
    }
  };

  if (loadingNote) return <Typography>Chargement de la note...</Typography>;
  if (!note) return <Typography>Note introuvable</Typography>;

  return (
    <Card sx={{ p: { xs: 2, sm: 4 }, borderRadius: 4, border: `1px solid ${theme.palette.divider}`, boxShadow: theme.palette.mode === "light" ? 3 : 6 }}>
      <Typography variant="h5" mb={3}>Modifier la note</Typography>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField label="Titre" value={title} onChange={e => setTitle(e.target.value)} fullWidth required />
          <TextField label="Contenu" value={content} onChange={e => setContent(e.target.value)} multiline rows={4} fullWidth required />
          <Stack direction="row" justifyContent="flex-end">
            <Button type="submit" variant="contained" size="large" disabled={loading}>
              {loading ? "Mise à jour..." : "Mettre à jour"}
            </Button>
          </Stack>
        </Stack>
      </form>
    </Card>
  );
}
