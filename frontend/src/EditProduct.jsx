import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_URL.replace("/api", "");
export default function EditProduct() {
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  const [imageFile, setImageFile] = useState(null);
  const url = import.meta.env.VITE_API_URL + "/products";
  const Navigate = useNavigate();
  const fetchProduct = async () => {
    const res = await axios.get(`${url}/getProduct/${productId}`);
    setProduct(res.data.product);
  };
  useEffect(() => {
    fetchProduct();
  }, []);
  const handleUpdate = async (productId) => {
    const formData = new FormData();
    formData.append("name", product.name || "");
    formData.append("description", product.description || "");
    formData.append("price", product.price || "");
    if (imageFile) formData.append("image", imageFile);
    await axios.patch(`${url}/update/${productId}`, formData);
    Navigate("/admin/products");
  };
  return (
    <div>
      EditProduct
      <p>
        <input
          type="text"
          onChange={(e) => setProduct({ ...product, name: e.target.value })}
          value={product.name || ""}
        />
      </p>
      <p>
        <input type="text" onChange={(e) => setProduct({ ...product, description: e.target.value })} value={product.description || ""} />
      </p>
      <p>
        <input type="number" onChange={(e) => setProduct({ ...product, price: e.target.value })} value={product.price || ""} />
      </p>
      <p>
        {product.imgUrl && (
          <img src={`${BASE_URL}/product_images/${product.imgUrl}`} width={100} alt="current" />
        )}
        <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} />
      </p>
      <p>
        <button onClick={() => handleUpdate(product._id)}>Update</button>
      </p>
    </div>
  );
}
