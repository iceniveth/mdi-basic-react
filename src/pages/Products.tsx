import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { useCartContext } from "../contexts/CartContext";

export type Product = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  rating: { rate: number; count: number };
  title: string;
};

export default function Products() {
  const [_, setLocation] = useLocation();
  const [products, setProducts] = useState<Product[]>([]);
  const { dispatch } = useCartContext();

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) => setProducts(json));
  }, []);

  return (
    <>
      <h2>Products</h2>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
        {products.map((product) => (
          <div
            style={{ padding: "8px", border: "2px grey solid", width: "160px" }}
          >
            <img
              src={product.image}
              alt={product.title}
              style={{ width: "100%" }}
            />
            <p style={{ fontSize: ".8rem" }}>
              <strong>{product.title}</strong>
            </p>
            <p style={{ fontSize: ".6rem" }}>{product.description}</p>
            <button
              style={{ width: "100%" }}
              onClick={() => {
                setLocation(`/products/${product.id}`);
              }}
            >
              View
            </button>
            <div style={{ margin: "8px" }} />
            <button
              style={{
                width: "100%",
                backgroundColor: "red",
                border: "1px solid red",
                color: "white",
              }}
              onClick={() => {
                dispatch({ type: "addToCart", product });
              }}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
