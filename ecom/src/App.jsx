import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: '', description: '', price: '' });
  const [error, setError] = useState('');

  const fetchProducts = async () => {
    try {
      const res = await axios.get('https://ecom-backhand.vercel.app/products');
      setProducts(res.data.product_list);
    } catch (err) {
      console.error(err);
    }
  };

  const addProduct = async () => {
    if (!form.name || !form.description || !form.price) {
      setError('Please fill all fields');
      return;
    }
    try {
      await axios.post('https://ecom-backhand.vercel.app/product', form);
      setForm({ name: '', description: '', price: '' });
      setError('');
      fetchProducts();
    } catch (err) {
      console.error(err);
      setError('Failed to add product');
    }
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`https://ecom-backhand.vercel.app/product/${id}`);
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif', display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
      <h1>🛒 My E-Commerce App</h1>

      <div style={{ marginBottom: '1rem',}}>
        <input style={{padding:'1rem'}}
          type="text"
          placeholder="Product Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input style={{padding:'1rem'}}
          type="text"
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <input style={{padding:'1rem'}}
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />
        <button style={{padding:'1rem'}} onClick={addProduct}>Add Product</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>

      <h2>🧾 Product List</h2>
      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <ul>
          {products.map((p) => (
            <li key={p.id}>
              <strong>{p.name}</strong> - {p.description} (${p.price})
              <button style={{ marginLeft: '1rem',padding:'1rem' }} onClick={() => deleteProduct(p.id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
