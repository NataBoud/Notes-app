import { BASE_URL } from "../config";
import type { NoteInterface } from "../interfaces/NoteInterface";

// Récupérer toutes les notes
export async function fetchNotes(token: string): Promise<NoteInterface[]> {
    const res = await fetch(`${BASE_URL}/notes`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) {
        throw new Error("Erreur de chargement des notes");
    }
    return res.json();
}


// Récupérer une note par ID
export async function fetchNoteById(id: string, token: string): Promise<NoteInterface> {
    const res = await fetch(`${BASE_URL}/notes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) {
        throw new Error("Note introuvable");
    }
    return res.json();
}

// Mettre à jour une note
export async function updateNoteRequest(id: string, data: { title: string; content: string }, token: string): Promise<NoteInterface> {
    const res = await fetch(`${BASE_URL}/notes/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    });
    if (!res.ok) {
        throw new Error("Erreur lors de la mise à jour");
    }
    return res.json();
}

// Renvoie la note créée
export async function addNoteRequest(title: string, content: string, token: string): Promise<NoteInterface> {
    const res = await fetch(`${BASE_URL}/notes`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, content }),
    });

    if (!res.ok) {
        const msg = await res.text();
        throw new Error(`Erreur lors de la création de la note: ${msg}`);
    }

    return res.json(); 
}

// Supprimer une note par ID
export async function deleteNoteRequest(id: string, token: string): Promise<void> {
    const res = await fetch(`${BASE_URL}/notes/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) {
        throw new Error("Erreur lors de la suppression");
    }
}

