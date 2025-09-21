import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { NoteInterface } from "../interfaces/NoteInterface";

const initialState: NoteInterface[] = [];


const notesSlice = createSlice({
    name: "notes",
    initialState,
    reducers: {
        addNote: (state, action: PayloadAction<{ id: string; title: string; content: string }>) => {
            state.push({
                id: action.payload.id.toString(),
                title: action.payload.title,
                content: action.payload.content,
                createdAt: new Date().toISOString(),
            });
        },
        deleteNote: (state, action: PayloadAction<string>) => {
            return state.filter(n => n.id !== action.payload);
        },
        updateNote: (state, action: PayloadAction<{ id: string; title: string; content: string }>) => {
            const noteToUpdate = state.find(n => n.id === action.payload.id.toString());
            if (noteToUpdate) {
                noteToUpdate.title = action.payload.title;
                noteToUpdate.content = action.payload.content;
            }
        },
        setNotes: (state, action: PayloadAction<NoteInterface[]>) => {
            return action.payload; // pour remplir le store depuis le backend
        },
    },
});

export const { addNote, deleteNote, updateNote, setNotes } = notesSlice.actions;
export default notesSlice.reducer;
