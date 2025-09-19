import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { NoteInterface } from "../interfaces/NoteInterface";

const initialState: NoteInterface[] = [
    { id: "1", note: "Première note par défaut", dateAjout: new Date().toISOString() },
    { id: "2", note: "Deuxième note par défaut", dateAjout: new Date().toISOString() },
];

const notesSlice = createSlice({
    name: "notes",
    initialState,
    reducers: {
        
        addNote: (state, action: PayloadAction<{ note: string }>) => {
            state.push({
                id: (state.length + 1).toString(),
                note: action.payload.note,
                dateAjout: new Date().toISOString()
            });
        },
        deleteNote: (state, action: PayloadAction<string>) => {
            return state.filter(n => n.id !== action.payload);
        },
        updateNote: (state, action: PayloadAction<{ id: string; note: string }>) => {
            const noteToUpdate = state.find(n => n.id === action.payload.id);
            if (noteToUpdate) {
                noteToUpdate.note = action.payload.note;
            }
        },
    },
});

export const { addNote, deleteNote, updateNote } = notesSlice.actions;
export default notesSlice.reducer;
