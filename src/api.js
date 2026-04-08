const TOKEN_KEY = "catalogo_token";

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token) {
  if (token) localStorage.setItem(TOKEN_KEY, token);
  else localStorage.removeItem(TOKEN_KEY);
}

export async function apiFetch(path, options = {}) {
  const token = getToken();
  const headers = { "Content-Type": "application/json", ...options.headers };
  if (token) headers.Authorization = `Bearer ${token}`;
  const res = await fetch(path, { ...options, headers });
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
