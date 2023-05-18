import {
  FunctionComponent,
  PropsWithChildren,
  createContext,
  useContext,
  useReducer,
} from "react";
import { getCart } from "../apis/cart";

export type CartItem = {
  _id: string;
  title: string;
  quantity: number;
  productId: number;
};

type State = {
  cart: CartItem[];
};

type Action =
  | { type: "addToCart"; cartItem: CartItem }
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
        (ci) => ci.productId === action.cartItem.productId
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
        return { cart: state.cart.concat(action.cartItem) };
      }
    }

    case "clearCart": {
      return { cart: [] };
    }

    case "increaseQuantity": {
      const updatedCart = state.cart.map((cartItem) =>
        cartItem.productId === action.productId
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );
      return { cart: updatedCart };
    }

    case "decreaseQuantity": {
      const updatedCart = state.cart.map((cartItem) =>
        cartItem.productId === action.productId
          ? { ...cartItem, quantity: cartItem.quantity - 1 }
          : cartItem
      );
      return { cart: updatedCart };
    }

    case "removeFromCart": {
      throw new Error("Implement removeFromCart");
    }

    default:
      throw new Error("Unhandled action type");
  }
};

const defaultCart = await getCart();

export const CartProvider: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, { cart: defaultCart });

  return (
    <CartContext.Provider value={{ cart: state.cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => useContext<Context>(CartContext);
