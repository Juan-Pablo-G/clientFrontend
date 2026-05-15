import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function LoginModal({ onClose }) {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      onClose();
    } catch (err) {
      setError(err.message || "No se pudo iniciar sesión");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-panel" role="dialog" aria-labelledby="login-title">
        <h3 id="login-title">Iniciar sesión</h3>
        {error ? <p className="error-msg">{error}</p> : null}
        <form onSubmit={handleSubmit}>
          <div className="form-field">
            <label htmlFor="email">Correo</label>
            <input
              id="email"
              type="email"
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-field">
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-actions">
            <button type="submit" className="btn-1" disabled={loading} style={{ border: "none", cursor: "pointer" }}>
              {loading ? "Entrando…" : "Entrar"}
            </button>
            <button type="button" className="btn-auth" onClick={onClose}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
