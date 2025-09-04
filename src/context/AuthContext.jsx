// src/context/AuthContext.jsx
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { API, tokenStore, userStore, profileStore } from "../lib/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [tokens, setTokens]   = useState(() => tokenStore.get());
  const [user, setUser]       = useState(() => userStore.get());
  const [profile, setProfile] = useState(() => profileStore.get());

  // rehidratar por si ya había algo en storage
  useEffect(() => {
    if (!tokens) setTokens(tokenStore.get());
    if (!user) setUser(userStore.get());
    if (!profile) setProfile(profileStore.get());
  }, []); // 1 vez

  const isAuthed = !!tokens?.accessToken && !!user;

  const login = useCallback(async ({ user: u, pass, remember = true }) => {
    const data = await API.login({ user: u, pass });
    const tk = { accessToken: data.accessToken, refreshToken: data.refreshToken };

    tokenStore.set(tk, remember);
    userStore.set(data.user, remember);
    profileStore.set(data.profile || null, remember);

    setTokens(tk);
    setUser(data.user);
    setProfile(data.profile || null);
    return data;
  }, []);

  const register = useCallback(async ({ username, email, password, remember = true }) => {
    const data = await API.register({ username, email, password });
    const tk = { accessToken: data.accessToken, refreshToken: data.refreshToken };

    tokenStore.set(tk, remember);
    userStore.set(data.user, remember);
    profileStore.set(data.profile || null, remember);

    setTokens(tk);
    setUser(data.user);
    setProfile(data.profile || null);
    return data;
  }, []);

  const logout = useCallback(async () => {
    const rt = tokenStore.get()?.refreshToken;
    try { await API.logout(rt); } catch {}
    tokenStore.clear();
    userStore.clear();
    profileStore.clear();
    setTokens(null);
    setUser(null);
    setProfile(null);
  }, []);

  const setProfileAndPersist = useCallback((p, remember) => {
    // si no indican, usamos el storage "preferido"
    const rem = remember ?? (localStorage.getItem("auth.remember") !== "session");
    profileStore.set(p, rem);
    setProfile(p);
  }, []);

  const value = useMemo(() => ({
    tokens, user, profile, isAuthed,
    login, register, logout,
    setProfile: setProfileAndPersist,
  }), [tokens, user, profile, isAuthed, login, register, logout, setProfileAndPersist]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
