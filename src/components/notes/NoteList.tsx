import { Stack, Paper, useTheme } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import NoteItem from "./NoteItem";
import { useEffect } from "react";
import { setNotes } from "../../store/notesSlice";


export default function NoteList() {
    const notes = useSelector((state: RootState) => state.notes);
    const theme = useTheme();
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await fetch("http://localhost:8080/api/notes", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (!response.ok) throw new Error("Erreur de chargement des notes");
                const fetchedNotes = await response.json();
                dispatch(setNotes(fetchedNotes));
            } catch (err) {
                console.error(err);
            }
        };

        fetchNotes();
    }, [dispatch]);


    return (
        <Paper
            elevation={4}
            sx={{
                p: { xs: 2, sm: 4 },
                borderRadius: 4,
                border: `1px solid ${theme.palette.divider}`,
                boxShadow: theme.palette.mode === "light" ? 3 : 6,
            }}
        >
            <Stack spacing={1}>
                {notes.map((note) => (
                    <NoteItem key={note.id} note={note} />
                ))}
            </Stack>
        </Paper>
    );
}
