import { useEffect, useState } from "react";
import { createProduct, deleteProduct, fetchProducts, updateProduct, uploadProductImage } from "../api";

const emptyForm = { title: "", subtitle: "", image: "", detailPath: "", description: "" };

export default function AdminModal({ onClose, onSaved }) {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    setError("");
    try {
      const list = await fetchProducts();
      setProducts(Array.isArray(list) ? list : []);
    } catch (e) {
      setError(e.message || "Error al cargar productos");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  function startEdit(p) {
    setEditingId(p.id);
    setForm({
      title: p.title,
      subtitle: p.subtitle || "",
      image: p.image,
      detailPath: p.detailPath || "",
      description: p.description || "",
    });
    setImageFile(null);
    setImagePreview("");
  }

  function fileToDataUrl(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  function handleImageFileChange(e) {
    const file = e.target.files?.[0] || null;
    setImageFile(file);
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setForm((f) => ({ ...f, image: file.name }));
    } else {
      setImagePreview("");
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    try {
      let imageName = form.image.trim();

      if (imageFile) {
        const dataUrl = await fileToDataUrl(imageFile);
        const uploaded = await uploadProductImage(imageFile.name, dataUrl);
        imageName = uploaded.filename;
      }

      if (!editingId && !imageName) {
        throw new Error("Debes elegir una imagen para el producto");
      }

      const body = {
        title: form.title.trim(),
        subtitle: form.subtitle.trim() || "",
        detailPath: form.detailPath.trim() || undefined,
        description: form.description.trim() || "",
      };

      if (imageName) body.image = imageName;

      if (editingId) {
        await updateProduct(editingId, body);
      } else {
        await createProduct(body);
      }
      setForm(emptyForm);
      setImageFile(null);
      setImagePreview("");
      setEditingId(null);
      await load();
      onSaved?.();
    } catch (err) {
      setError(err.message || "Error al guardar");
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("¿Eliminar este producto?")) return;
    setError("");
    try {
      await deleteProduct(id);
      if (editingId === id) {
        setEditingId(null);
        setForm(emptyForm);
      }
      await load();
      onSaved?.();
    } catch (err) {
      setError(err.message || "Error al eliminar");
    }
  }

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-panel wide" role="dialog" aria-labelledby="admin-title">
        <h3 id="admin-title">Gestionar productos</h3>
        <p style={{ fontSize: 14, color: "#555", marginBottom: 12 }}>
          Puedes subir imágenes desde tu PC usando el botón de archivo. El sistema guarda en <code>/images</code> y usa
          el nombre generado. Si no eres admin, mantén la opción de usar nombres ya existentes (p.ej. <code>pla1.png</code>).
          El enlace &quot;Ver más&quot; puede ser la ruta interna (por ejemplo <code>/obra/&lt;id&gt;</code>) o una URL completa.
        </p>
        {error ? <p className="error-msg">{error}</p> : null}
        <form onSubmit={handleSubmit}>
          <div className="form-field">
            <label>Título</label>
            <input
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              required
              placeholder="Nombre del producto"
            />
          </div>
          <div className="form-field">
            <label>Subtítulo / slogan (opcional)</label>
            <input
              value={form.subtitle}
              onChange={(e) => setForm((f) => ({ ...f, subtitle: e.target.value }))}
              placeholder="Texto corto para la página de detalle"
            />
          </div>
          <div className="form-field">
            <label>Seleccionar imagen (PC)</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageFileChange}
              required={!editingId && !form.image}
            />
            <small>Haz click y selecciona un archivo desde tu explorador. Al editar, si no eliges ninguno se conserva la imagen actual.</small>
            {imagePreview ? (
              <div style={{ marginTop: 8 }}>
                <img src={imagePreview} alt="Vista previa" style={{ maxWidth: 160, maxHeight: 160, objectFit: "cover" }} />
              </div>
            ) : form.image ? (
              <div style={{ marginTop: 8 }}>
                <strong>Imagen actual:</strong> {form.image}
              </div>
            ) : null}
          </div>
          <div className="form-field">
            <label>Enlace &quot;Ver más&quot; (opcional)</label>
            <input
              value={form.detailPath}
              onChange={(e) => setForm((f) => ({ ...f, detailPath: e.target.value }))}
              placeholder="Vacío = página de detalle por defecto /obra/&lt;id&gt;"
            />
          </div>          <div className="form-field">
            <label>Descripción de producto</label>
            <textarea
              rows={4}
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              placeholder="Texto que se mostrará en la página de detalle"
            />
          </div>          <div className="form-actions">
            <button type="submit" className="btn-1" style={{ border: "none", cursor: "pointer" }}>
              {editingId ? "Guardar cambios" : "Agregar producto"}
            </button>
            {editingId ? (
              <button
                type="button"
                className="btn-auth"
                onClick={() => {
                  setEditingId(null);
                  setForm(emptyForm);
                }}
              >
                Cancelar edición
              </button>
            ) : null}
            <button type="button" className="btn-auth" onClick={onClose}>
              Cerrar
            </button>
          </div>
        </form>

        <h4 style={{ marginTop: 24, marginBottom: 8, fontSize: 18 }}>Listado</h4>
        {loading ? <p>Cargando…</p> : null}
        {!loading && products.length === 0 ? <p>No hay productos.</p> : null}
        {!loading && products.length > 0 ? (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Título</th>
                <th>Subtítulo</th>
                <th>Imagen</th>
                <th>Enlace</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id}>
                  <td>{p.title}</td>
                  <td>{p.subtitle || "-"}</td>
                  <td>{p.image}</td>
                  <td style={{ maxWidth: 180, overflow: "hidden", textOverflow: "ellipsis" }}>{p.detailPath}</td>
                  <td>
                    <div className="admin-actions">
                      <button type="button" className="btn-small edit" onClick={() => startEdit(p)}>
                        Editar
                      </button>
                      <button type="button" className="btn-small danger" onClick={() => handleDelete(p.id)}>
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : null}
      </div>
    </div>
  );
}
