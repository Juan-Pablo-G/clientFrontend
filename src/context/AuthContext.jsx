import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { loginRequest, setToken, getToken } from "../api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem("catalogo_user");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  const login = useCallback(async (email, password) => {
    const data = await loginRequest(email, password);
    setToken(data.token);
    const u = data.user;
    localStorage.setItem("catalogo_user", JSON.stringify(u));
    setUser(u);
    return u;
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    localStorage.removeItem("catalogo_user");
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      token: getToken(),
      isAuthenticated: !!user && !!getToken(),
      login,
      logout,
    }),
    [user, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return ctx;
}
