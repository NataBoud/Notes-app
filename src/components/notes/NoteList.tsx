import { Stack, Paper, useTheme, Typography } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import NoteItem from "./NoteItem";
import { useEffect, useState } from "react";
import { setNotes } from "../../store/notesSlice";
import { fetchNotes } from "../../api/noteApi";


export default function NoteList() {
    const notes = useSelector((state: RootState) => state.notes);
    const theme = useTheme();
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadNotes = async () => {
            try {
                const token = localStorage.getItem("token") || "";
                const fetchedNotes = await fetchNotes(token);
                dispatch(setNotes(fetchedNotes));
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        loadNotes();
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
            {loading ? (
                <Typography>Chargement des notes...</Typography>
            ) : notes.length === 0 ? (
                <Typography>Vous n'avez pas encore de notes</Typography>
            ) : (
                <Stack spacing={1}>
                    {notes.map((note) => (
                        <NoteItem key={note.id} note={note} />
                    ))}
                </Stack>
            )}
        </Paper>
    );
}
