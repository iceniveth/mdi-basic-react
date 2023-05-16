import { Link } from "wouter";
import { useCartContext } from "./contexts/CartContext";

export default function CartCount() {
  const { cart } = useCartContext();

  return (
    <>
      <Link href="/cart">Cart ({cart.length})</Link>
    </>
  );
}
