import { CartItem } from "../contexts/CartContext";

export const addToCart = (data: { title: string; productId: number }) => {
  return fetch("/api/cart", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then((response): Promise<CartItem> => response.json());
};

export const getCart = () =>
  fetch("/api/cart").then((response) => response.json());

export const updateCartItem = ({
  _id,
  quantity,
}: {
  _id: string;
  quantity: number;
}) =>
  fetch(`/api/cart/${_id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ quantity }),
  }).then((response) => response.json());

export const clearCart = () => fetch("/api/cart", { method: "DELETE" });
