import { useCartContext } from "../contexts/CartContext";

export default function Cart() {
  const { cart, dispatch } = useCartContext();
  return (
    <>
      <div
        style={{ marginTop: "8px", display: "flex", flexDirection: "column" }}
      >
        {cart.map((cartItem) => (
          <div style={{ margin: "8px 0", display: "flex" }}>
            <p>{cartItem.title}</p> <div style={{ flexGrow: 1 }} />
            <p>x{cartItem.quantity}</p>
            <button
              onClick={() => {
                dispatch({ type: "increaseQuantity", productId: cartItem.id });
              }}
            >
              +
            </button>
            <button>-</button>
          </div>
        ))}

        <div style={{ height: "32px" }} />
        <button
          style={{ color: "red" }}
          onClick={() => dispatch({ type: "clearCart" })}
        >
          Clear Cart
        </button>
      </div>
    </>
  );
}
