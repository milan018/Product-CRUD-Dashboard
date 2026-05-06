import { useEffect, useState } from "react";
import "./App.css";

const API_BASE = "/api/products";

function App() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: "", description: "", price: "" });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(API_BASE);
      const result = await response.json();
      if (!response.ok)
        throw new Error(result.message || "Failed to load products");
      setProducts(result.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setMessage("");

    if (!form.name.trim() || !form.description.trim() || !form.price) {
      setError("Please fill in all product fields.");
      return;
    }

    try {
      const payload = {
        name: form.name,
        description: form.description,
        price: Number(form.price),
      };
      const method = editingId ? "PUT" : "POST";
      const url = editingId ? `${API_BASE}/${editingId}` : API_BASE;

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Request failed");

      setMessage(result.message);
      setForm({ name: "", description: "", price: "" });
      setEditingId(null);
      loadProducts();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = (product) => {
    setEditingId(product.id);
    setForm({
      name: product.name || "",
      description: product.description || "",
      price: product.price || "",
    });
    setMessage("Editing product. Update values and submit.");
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    setError("");
    setMessage("");

    try {
      const response = await fetch(`${API_BASE}/${id}`, { method: "DELETE" });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Delete failed");
      setMessage(result.message);
      loadProducts();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setForm({ name: "", description: "", price: "" });
    setMessage("");
  };

  return (
    <div className="app-shell">
      <header>
        <h1>Product CRUD Dashboard</h1>
        <p>Manage products using your Node.js + PostgreSQL API.</p>
      </header>

      <main>
        <section className="panel form-panel">
          <h2>{editingId ? "Edit Product" : "Add Product"}</h2>
          {message && <div className="toast success">{message}</div>}
          {error && <div className="toast error">{error}</div>}
          <form onSubmit={handleSubmit}>
            <label>
              Name
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter product name"
              />
            </label>
            <label>
              Description
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Enter product description"
              />
            </label>
            <label>
              Price
              <input
                name="price"
                type="number"
                step="0.01"
                value={form.price}
                onChange={handleChange}
                placeholder="Enter product price"
              />
            </label>
            <div className="form-actions">
              <button type="submit">{editingId ? "Update" : "Create"}</button>
              {editingId && (
                <button
                  type="button"
                  className="secondary"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </section>

        <section className="panel list-panel">
          <div className="list-header">
            <h2>Products</h2>
            <button onClick={loadProducts}>Refresh</button>
          </div>
          {loading ? (
            <p>Loading products...</p>
          ) : products.length === 0 ? (
            <p>No products found. Add a product to get started.</p>
          ) : (
            <div className="product-table-wrapper">
              <table className="product-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id}>
                      <td>{product.id}</td>
                      <td>{product.name}</td>
                      <td>{product.description}</td>
                      <td>${Number(product.price).toFixed(2)}</td>
                      <td>
                        <button onClick={() => handleEdit(product)}>
                          Edit
                        </button>
                        <button
                          className="danger"
                          onClick={() => handleDelete(product.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
