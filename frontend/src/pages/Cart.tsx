import { clearCart, updateCartItem } from "../apis/cart";
import { useCartContext } from "../contexts/CartContext";

export default function Cart() {
  const { cart, dispatch } = useCartContext();
  return (
    <>
      <div
        style={{ marginTop: "8px", display: "flex", flexDirection: "column" }}
      >
        {cart.map((cartItem) => (
          <div style={{ margin: "8px 0", display: "flex" }} key={cartItem._id}>
            <p>{cartItem.title}</p> <div style={{ flexGrow: 1 }} />
            <p>x{cartItem.quantity}</p>
            <button
              onClick={() => {
                dispatch({
                  type: "increaseQuantity",
                  productId: cartItem.productId,
                });
                // Suffers from race condition (spam clicking)
                updateCartItem({
                  _id: cartItem._id,
                  quantity: cartItem.quantity + 1,
                });
              }}
            >
              +
            </button>
            <button
              onClick={() => {
                dispatch({
                  type: "decreaseQuantity",
                  productId: cartItem.productId,
                });
                // Suffers from race condition (spam clicking)
                updateCartItem({
                  _id: cartItem._id,
                  quantity: cartItem.quantity - 1,
                });
              }}
            >
              -
            </button>
          </div>
        ))}

        <div style={{ height: "32px" }} />
        <button
          style={{ color: "red" }}
          onClick={() => {
            dispatch({ type: "clearCart" });
            clearCart();
          }}
        >
          Clear Cart
        </button>
      </div>
    </>
  );
}
