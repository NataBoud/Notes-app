import { Stack, IconButton } from "@mui/material";
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteNote } from "../../store/notesSlice";
import type { NoteInterface } from "../../interfaces/NoteInterface";
import { deleteNoteRequest } from "../../api/noteApi";

interface NoteActionsProps {
    note: NoteInterface;
}

export default function NoteActions({ note }: NoteActionsProps) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleDelete = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) throw new Error("Utilisateur non authentifié");

            await deleteNoteRequest(note.id, token);
            dispatch(deleteNote(note.id));
        } catch (err) {
            console.error(err);
            alert("Erreur lors de la suppression de la note");
        }
    };

    return (
        <Stack direction="row" spacing={1}>
            <IconButton color="primary" size="small" onClick={() => navigate(`/notes/${note.id}`)}>
                <ModeEditOutlineOutlinedIcon />
            </IconButton>
            <IconButton color="error" size="small" onClick={handleDelete}>
                <DeleteOutlineOutlinedIcon />
            </IconButton>
        </Stack>
    );
}
