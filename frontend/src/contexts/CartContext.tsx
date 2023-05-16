import {
  FunctionComponent,
  PropsWithChildren,
  createContext,
  useContext,
  useReducer,
} from "react";
import { Product } from "../pages/Products";

type CartItem = Product & { quantity: number };

type State = {
  cart: CartItem[];
};

type Action =
  | { type: "addToCart"; product: Product }
  | { type: "increaseQuantity"; productId: number }
  | { type: "decreaseQuantity"; productId: number }
  | { type: "removeFromCart"; productId: number }
  | { type: "clearCart" };

type Dispatch = (action: Action) => void;

type Context = { cart: CartItem[]; dispatch: Dispatch };

const CartContext = createContext<Context>({
  cart: [],
  dispatch: () => {
    throw new Error("dispatch function must be overridden");
  },
});

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "addToCart": {
      const foundIndex = state.cart.findIndex(
        (ci) => ci.id === action.product.id
      );

      const isAlreadyInCart = foundIndex >= 0;

      if (isAlreadyInCart) {
        return {
          cart: state.cart.map((cartItem, index) =>
            index === foundIndex
              ? { ...cartItem, quantity: cartItem.quantity + 1 }
              : cartItem
          ),
        };
      } else {
        const cartItem: CartItem = { ...action.product, quantity: 1 };
        return { cart: state.cart.concat(cartItem) };
      }
    }

    case "clearCart": {
      return { cart: [] };
    }

    case "increaseQuantity": {
      const updatedCart = state.cart.map((cartItem) =>
        cartItem.id === action.productId
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );
      return { cart: updatedCart };
    }

    case "decreaseQuantity": {
      throw new Error("Implement decreaseQuantity");
    }

    case "removeFromCart": {
      throw new Error("Implement removeFromCart");
    }

    default:
      throw new Error("Unhandled action type");
  }
};

export const CartProvider: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, { cart: [] });

  return (
    <CartContext.Provider value={{ cart: state.cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => useContext<Context>(CartContext);
