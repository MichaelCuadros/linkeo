// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading)
    return <div style={{ color: "#fff", padding: 20 }}>Cargando…</div>;
  if (!user) return <Navigate to="/login" replace />;
  return children;
}
