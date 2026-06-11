import React from "react";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_URL.replace("/api", "");
export default function Products() {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({});
  const [imageFile, setImageFile] = useState(null);
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);
  const url = import.meta.env.VITE_API_URL + "/products";
  const fetchProducts = async () => {
    const res = await axios.get(url + "/get");
    setProducts(res.data.products);
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  const handleAdd = async () => {
    try {
      setError("");
      const formData = new FormData();
      formData.append("name", product.name || "");
      formData.append("description", product.description || "");
      formData.append("price", product.price || "");
      if (imageFile) formData.append("image", imageFile);
      await axios.post(`${url}/create`, formData);
      setProduct({});
      setImageFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      fetchProducts();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add product");
    }
  };
  const handleDelete = async (productId) => {
    await axios.delete(`${url}/delete/${productId}`);
    fetchProducts();
  };
  return (
    <div>
      Products
      {error && <p style={{ color: "red" }}>{error}</p>}
      <p>
        <input
          type="text"
          value={product.name || ""}
          onChange={(e) => setProduct({ ...product, name: e.target.value })}
          placeholder="Name"
        />
        <input
          type="text"
          value={product.description || ""}
          onChange={(e) =>
            setProduct({ ...product, description: e.target.value })
          }
          placeholder="Description"
        />
        <input
          type="number"
          value={product.price || ""}
          onChange={(e) => setProduct({ ...product, price: e.target.value })}
          placeholder="Price"
        />
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={(e) => setImageFile(e.target.files[0])}
        />
        <button onClick={handleAdd}>Add</button>
      </p>
      <ol>
        {products &&
          products.map((product) => (
            <li key={product._id}>
              <Link to={`/admin/editProduct/${product._id}`}> {product.name}</Link>-
              {product.price}-{product.description}-
              {product.imgUrl && (
                <img src={`${BASE_URL}/product_images/${product.imgUrl}`} width={60} alt={product.name} />
              )}
              <button onClick={() => handleDelete(product._id)}>Delete</button>
            </li>
          ))}
      </ol>
    </div>
  );
}
