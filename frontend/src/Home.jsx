import { useContext, useEffect, useState } from "react";
import { AppContext } from "./App";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_URL.replace("/api", "");

function StarRating({ product, user, onRate }) {
  const [hovered, setHovered] = useState(0);
  const avg =
    product.ratings?.length
      ? Math.round(product.ratings.reduce((sum, r) => sum + r.rating, 0) / product.ratings.length)
      : 0;
  const userRating =
    user?.id
      ? product.ratings?.find((r) => r.user === user.id)?.rating || 0
      : 0;
  const display = hovered || userRating || avg;

  return (
    <div className="flex items-center gap-1 mb-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className="text-2xl"
          style={{ cursor: user?.id ? "pointer" : "default", color: star <= display ? "#f5a623" : "#ccc" }}
          onMouseEnter={() => user?.id && setHovered(star)}
          onMouseLeave={() => setHovered(0)}
          onClick={() => user?.id && onRate(product._id, star)}
        >
          ★
        </span>
      ))}
      <span className="text-xs text-gray-400 ml-1">
        {product.ratings?.length
          ? `${(product.ratings.reduce((s, r) => s + r.rating, 0) / product.ratings.length).toFixed(1)} (${product.ratings.length})`
          : "No ratings"}
      </span>
    </div>
  );
}

export default function Home() {
  const { user, cart, setCart } = useContext(AppContext);
  const [products, setProducts] = useState([]);
  const url = import.meta.env.VITE_API_URL + "/products";

  const fetchProducts = async () => {
    const res = await axios.get(url + "/get");
    setProducts(res.data.products);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addToCart = (product) => {
    setCart([...cart, { ...product, quantity: 1 }]);
  };

  const increment = (id) => {
    setCart(cart.map((item) => item._id === id ? { ...item, quantity: item.quantity + 1 } : item));
  };

  const decrement = (id) => {
    setCart(
      cart.map((item) => item._id === id ? { ...item, quantity: item.quantity - 1 } : item)
          .filter((item) => item.quantity > 0)
    );
  };

  const handleRate = async (productId, rating) => {
    await axios.post(
      `${url}/rate/${productId}`,
      { rating },
      { headers: { Authorization: `Bearer ${user.token}` } }
    );
    fetchProducts();
  };

  return (
    <div className="flex flex-wrap gap-4 p-5">
      {products &&
        products.map((product) => (
          <div key={product._id} className="border border-gray-200 rounded-md p-3 bg-white w-[220px]">
            {product.imgUrl && (
              <img
                src={`${BASE_URL}/product_images/${product.imgUrl}`}
                className="w-full rounded mb-2"
              />
            )}
            <h3 className="text-base font-semibold my-1">{product.name}</h3>
            <p className="text-xs text-gray-500 mb-1">{product.description}</p>
            <h4 className="text-sm font-bold mb-2">₹{product.price}</h4>
            <StarRating product={product} user={user} onRate={handleRate} />
            {!user?.id && <p className="text-xs text-gray-400">Login to rate</p>}
            <div className="mt-2">
              {cart.find((item) => item._id === product._id) ? (
                <span className="flex items-center gap-2">
                  <button
                    onClick={() => decrement(product._id)}
                    className="bg-gray-800 text-white px-3 py-1 rounded hover:bg-gray-600"
                  >-</button>
                  <span>{cart.find((item) => item._id === product._id).quantity}</span>
                  <button
                    onClick={() => increment(product._id)}
                    className="bg-gray-800 text-white px-3 py-1 rounded hover:bg-gray-600"
                  >+</button>
                </span>
              ) : (
                <button
                  onClick={() => addToCart(product)}
                  className="bg-gray-800 text-white px-4 py-1 rounded text-sm hover:bg-gray-600 w-full"
                >
                  Add to Cart
                </button>
              )}
            </div>
          </div>
        ))}
    </div>
  );
}
