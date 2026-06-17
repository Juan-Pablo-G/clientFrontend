const TOKEN_KEY = "catalogo_token";
const DEFAULT_API_BASE_URL = "https://serverbackend-8zzp.onrender.com";
export const API_BASE_URL = import.meta.env.VITE_API_URL || DEFAULT_API_BASE_URL;

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token) {
  if (token) localStorage.setItem(TOKEN_KEY, token);
  else localStorage.removeItem(TOKEN_KEY);
}

export function buildUrl(path) {
  if (!path) return path;
  if (/^https?:\/\//i.test(path)) return path;

  const isImage = path.startsWith("/images");
  const base = API_BASE_URL.replace(/\/+$/|^\s+|\s+$/g, "");

  if (isImage) {
    // Para imágenes locales y estáticas, usamos siempre la ruta relativa.
    // Vite en desarrollo y el servidor en producción resuelven /images/... correctamente.
    return path;
  }

  if (!API_BASE_URL) return path;
  return `${base}${path.startsWith("/") ? "" : "/"}${path}`;
}

export async function apiFetch(path, options = {}) {
  const token = getToken();
  const headers = { "Content-Type": "application/json", ...options.headers };
  if (token) headers.Authorization = `Bearer ${token}`;
  const res = await fetch(buildUrl(path), { ...options, headers });
  if (res.status === 204) {
    return null;
  }
  const text = await res.text();
  let data = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = text;
  }
  if (!res.ok) {
    const err = new Error((data && data.error) || res.statusText || "Error");
    err.status = res.status;
    err.data = data;
    throw err;
  }
  return data;
}

export async function loginRequest(email, password) {
  return apiFetch("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export async function fetchProducts() {
  return apiFetch("/api/products");
}

export async function fetchProduct(id) {
  return apiFetch(`/api/products/${encodeURIComponent(id)}`);
}

export async function createProduct(body) {
  return apiFetch("/api/products", { method: "POST", body: JSON.stringify(body) });
}

export async function updateProduct(id, body) {
  return apiFetch(`/api/products/${encodeURIComponent(id)}`, {
    method: "PUT",
    body: JSON.stringify(body),
  });
}

export async function deleteProduct(id) {
  return apiFetch(`/api/products/${encodeURIComponent(id)}`, { method: "DELETE" });
}

export async function uploadProductImage(filename, dataUrl) {
  return apiFetch("/api/products/upload", {
    method: "POST",
    body: JSON.stringify({ filename, data: dataUrl }),
  });
}
