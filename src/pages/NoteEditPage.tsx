import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TextField, Button, Stack, Typography, Card, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { updateNote, addNote } from "../store/notesSlice";
import type { RootState } from "../store/store";
import type { NoteInterface } from "../interfaces/NoteInterface";

export default function NoteEditPage() {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();

  const storeNote = useSelector((state: RootState) =>
    state.notes.find(n => n.id === id)
  );

  const [note, setNote] = useState<NoteInterface | null>(storeNote || null);
  const [title, setTitle] = useState(note?.title || "");
  const [content, setContent] = useState(note?.content || "");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // si la note n’est pas dans le store, la charger depuis le backend
    const fetchNote = async () => {
      if (!note) {
        try {
          const token = localStorage.getItem("token");
          const response = await fetch(`http://localhost:8080/api/notes/${id}`, {
            headers: { "Authorization": `Bearer ${token}` }
          });
          if (!response.ok) throw new Error("Note introuvable");
          const data: NoteInterface = await response.json();
          setNote(data);
          setTitle(data.title);
          setContent(data.content);

        } catch (err) {
          console.error(err);
          setNote(null);
        }
      }
    };

    fetchNote();
  }, [id, note, dispatch]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:8080/api/notes/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ title, content }),
      });

      if (!response.ok) throw new Error("Erreur lors de la mise à jour de la note");

      const updatedNote: NoteInterface = await response.json();

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
