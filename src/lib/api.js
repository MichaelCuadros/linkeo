// src/lib/api.js
const API_BASE = import.meta?.env?.VITE_API_BASE || "http://localhost:4000";

// ---------- Storage helpers (local / session)
function readJSON(storage, key) {
  try {
    const v = storage.getItem(key);
    return v ? JSON.parse(v) : null;
  } catch {
    return null;
  }
}
function writeJSON(storage, key, value) {
  try {
    storage.setItem(key, JSON.stringify(value));
  } catch {
    /* ignore */
  }
}
function del(storage, key) {
  try {
    storage.removeItem(key);
  } catch {}
}

const KEYS = {
  tokens: "auth.tokens",
  user: "auth.user",
  profile: "auth.profile",
  remember: "auth.remember", // "local" | "session"
};

function currentStorage() {
  const pref = localStorage.getItem(KEYS.remember);
  if (pref === "session") return sessionStorage;
  return localStorage; // default
}

export const tokenStore = {
  get() {
    return (
      readJSON(localStorage, KEYS.tokens) ||
      readJSON(sessionStorage, KEYS.tokens)
    );
  },
  set(tokens, remember = true) {
    // limpiar ambas y escribir solo en una
    del(localStorage, KEYS.tokens);
    del(sessionStorage, KEYS.tokens);
    if (remember) {
      localStorage.setItem(KEYS.remember, "local");
      writeJSON(localStorage, KEYS.tokens, tokens);
    } else {
      localStorage.setItem(KEYS.remember, "session");
      writeJSON(sessionStorage, KEYS.tokens, tokens);
    }
  },
  clear() {
    del(localStorage, KEYS.tokens);
    del(sessionStorage, KEYS.tokens);
    del(localStorage, KEYS.remember);
  },
};

export const userStore = {
  get() {
    return (
      readJSON(localStorage, KEYS.user) || readJSON(sessionStorage, KEYS.user)
    );
  },
  set(user, remember = null) {
    const stor =
      remember === null
        ? currentStorage()
        : remember
        ? localStorage
        : sessionStorage;
    del(localStorage, KEYS.user);
    del(sessionStorage, KEYS.user);
    writeJSON(stor, KEYS.user, user);
  },
  clear() {
    del(localStorage, KEYS.user);
    del(sessionStorage, KEYS.user);
  },
};

export const profileStore = {
  get() {
    return (
      readJSON(localStorage, KEYS.profile) ||
      readJSON(sessionStorage, KEYS.profile)
    );
  },
  set(profile, remember = null) {
    const stor =
      remember === null
        ? currentStorage()
        : remember
        ? localStorage
        : sessionStorage;
    del(localStorage, KEYS.profile);
    del(sessionStorage, KEYS.profile);
    writeJSON(stor, KEYS.profile, profile);
  },
  clear() {
    del(localStorage, KEYS.profile);
    del(sessionStorage, KEYS.profile);
  },
};

// ---------- fetch helpers
async function fetchJSON(url, init = {}) {
  const r = await fetch(url, init);
  const ct = r.headers.get("content-type") || "";
  const data = ct.includes("application/json")
    ? await r.json()
    : await r.text();
  if (!r.ok) {
    const msg = typeof data === "string" ? data : data?.message || r.statusText;
    throw new Error(msg || `HTTP ${r.status}`);
  }
  return data;
}

async function refreshTokens() {
  const rt = tokenStore.get()?.refreshToken;
  if (!rt) throw new Error("No refresh token");
  const data = await fetchJSON(`${API_BASE}/api/auth/refresh`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refreshToken: rt }),
  });
  tokenStore.set(
    { accessToken: data.accessToken, refreshToken: data.refreshToken },
    (localStorage.getItem(KEYS.remember) || "local") === "local"
  );
  return data;
}

async function authFetch(path, init = {}) {
  const tryOnce = async () => {
    const at = tokenStore.get()?.accessToken;
    const headers = new Headers(init.headers || {});
    if (at) headers.set("Authorization", `Bearer ${at}`);
    if (!headers.has("Content-Type") && init.body) {
      headers.set("Content-Type", "application/json");
    }
    const r = await fetch(`${API_BASE}${path}`, { ...init, headers });
    return r;
  };

  let res = await tryOnce();
  if (res.status === 401) {
    // reintentar con refresh
    try {
      await refreshTokens();
      res = await tryOnce();
    } catch {
      // limpiar sesión si el refresh falla
      tokenStore.clear();
      userStore.clear();
      profileStore.clear();
      // dejar que falle
    }
  }
  const ct = res.headers.get("content-type") || "";
  const data = ct.includes("application/json")
    ? await res.json()
    : await res.text();
  if (!res.ok) {
    const msg =
      typeof data === "string" ? data : data?.message || res.statusText;
    throw new Error(msg || `HTTP ${res.status}`);
  }
  return data;
}

// ---------- API público
export const API = {
  // Auth
  async login({ user, pass }) {
    // tu backend acepta { user, pass }
    const data = await fetchJSON(`${API_BASE}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user, pass }),
    });
    return data; // { user, profile, accessToken, refreshToken }
  },
  async register({ username, email, password }) {
    const data = await fetchJSON(`${API_BASE}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });
    return data;
  },
  async logout(refreshToken) {
    try {
      await fetchJSON(`${API_BASE}/api/auth/logout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken }),
      });
    } catch {
      // no interrumpir logout si backend no responde
    }
  },

  // Profiles (público)
  getProfileByUsername(username) {
    return fetchJSON(
      `${API_BASE}/api/profiles/by-username/${encodeURIComponent(username)}`
    );
  },

  // Profiles (propios, autenticado con token)
  getMeProfile() {
    return authFetch(`/api/profiles/me/profile`, { method: "GET" });
  },
  upsertMeProfile(payload) {
    return authFetch(`/api/profiles/me/profile`, {
      method: "PUT",
      body: JSON.stringify(payload),
    });
  },

  // opcional (si usas upsert por username, requiere ser dueño)
  upsertByUsername(username, payload) {
    return authFetch(
      `/api/profiles/by-username/${encodeURIComponent(username)}`,
      {
        method: "PUT",
        body: JSON.stringify(payload),
      }
    );
  },

  getMyNfcLayout() {
    return authFetch(`/api/profiles/me/nfc-layout`, { method: "GET" });
  },
  upsertMyNfcLayout(payload) {
    return authFetch(`/api/profiles/me/nfc-layout`, {
      method: "PUT",
      body: JSON.stringify(payload),
    });
  },
};
