import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import type { RootState } from "../store/store";
import React from "react";

export default function PrivateRoute({ children }: { children: React.ReactNode }) {
    const token = useSelector((state: RootState) => state.auth.token);

    // Si pas de token → redirige
    if (!token) return <Navigate to="/login" replace />;
    return <>{children}</>;
}
