import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";
import NotesPage from "../pages/NotesPage";
import NoteFormPage from "../pages/NoteFormPage";
import NoteEditPage from "../pages/NoteEditPage";
import NotFoundPage from "../pages/NotFoundPage";
import PrivateRoute from "./PrivateRoute";
import AppLayout from "../components/layouts/PagesLayout";


export default function AppRouter() {
    return (
        <Routes>
            <Route element={<AppLayout />}>
                {/* Routes publiques */}
                <Route index element={<HomePage />} />
                <Route path="register" element={<RegisterPage />} />
                <Route path="login" element={<LoginPage />} />

                {/* Routes privées */}
                <Route path="notes" element={
                        <PrivateRoute>
                            <NotesPage />
                        </PrivateRoute>
                    }
                />
                <Route path="notes/new" element={
                        <PrivateRoute>
                            <NoteFormPage />
                        </PrivateRoute>
                    }
                />
                <Route path="notes/:id" element={
                        <PrivateRoute>
                            <NoteEditPage />
                        </PrivateRoute>
                    }
                />
            </Route>

            {/* 404 */}
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
}
