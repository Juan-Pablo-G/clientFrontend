import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import LoginModal from "./LoginModal.jsx";
import AdminModal from "./AdminModal.jsx";

export default function AuthBar({ onProductsChanged }) {
  const { user, isAuthenticated, logout } = useAuth();
  const [loginOpen, setLoginOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);

  return (
    <li className="nav-auth-cell">
      <div className="auth-bar">
        {!isAuthenticated ? (
          <button type="button" className="btn-auth btn-auth-primary" onClick={() => setLoginOpen(true)}>
            Iniciar sesión
          </button>
        ) : (
          <>
            <span className="user-email" title={user.email}>
              {user.email}
            </span>
            <button type="button" className="btn-auth" onClick={() => setAdminOpen(true)}>
              Editar productos
            </button>
            <button type="button" className="btn-auth" onClick={logout}>
              Salir
            </button>
          </>
        )}
      </div>
      {loginOpen && <LoginModal onClose={() => setLoginOpen(false)} />}
      {adminOpen && (
        <AdminModal
          onClose={() => setAdminOpen(false)}
          onSaved={() => {
            onProductsChanged?.();
          }}
        />
      )}
    </li>
  );
}
