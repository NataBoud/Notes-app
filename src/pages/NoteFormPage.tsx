import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Stack, Typography, useTheme, Card } from "@mui/material";
import { useDispatch } from "react-redux";
import { addNote } from "../store/notesSlice";
import { addNoteRequest } from "../api/noteApi";

export default function NoteFormPage() {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Utilisateur non authentifié");

      const newNote = await addNoteRequest(title, content, token); 

      dispatch(addNote({
        id: newNote.id.toString(),
        title: newNote.title,
        content: newNote.content
      }));

      navigate("/notes");
    } catch (err) {
      console.error(err);
      alert("Erreur lors de l'ajout de la note.");
    } finally {
      setLoading(false);
    }
  };

  return (

      <Card 
        sx={{p: { xs: 2, sm: 4 }, borderRadius: 4, border: `1px solid ${theme.palette.divider}`, boxShadow: theme.palette.mode === "light" ? 3 : 6,}} >
        <Typography variant="h5" mb={3}> Nouvelle note</Typography>

        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField label="Titre" value={title} onChange={(e) => setTitle(e.target.value)} fullWidth required />
            <TextField label="Contenu" value={content} onChange={(e) => setContent(e.target.value)} multiline rows={4} fullWidth required />
            <Stack direction="row" justifyContent="flex-end">
              <Button type="submit" variant="contained" size="large" disabled={loading} >
                {loading ? "Ajout..." : "Ajouter"}
              </Button>
            </Stack>

          </Stack>
        </form>
      </Card>

  );
}
