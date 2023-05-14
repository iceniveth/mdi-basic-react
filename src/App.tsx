import { Link, Route, Switch } from "wouter";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ViewProduct from "./pages/ViewProduct";
import { CartProvider } from "./contexts/CartContext";
import CartCount from "./CartCount";
import Cart from "./pages/Cart";

export type TodoItemType = {
  id: number;
  task: string;
  checked: boolean;
};

// E-Commerce projects from the former batch:
// - https://iridescent-belekoy-72f60d.netlify.app/
// - https://cincocicd.netlify.app/
// - https://mock-ecommerce-reactjs.netlify.app/
// - https://641afc7f1233c1070f73bd1a--incomparable-sable-0aff20.netlify.app/

function App() {
  return (
    <>
      <CartProvider>
        <div style={{ display: "flex", gap: "8px" }}>
          <Link href="/">Home</Link>
          <Link href="/products">Products</Link>

          <div style={{ flexGrow: 1 }} />
          <CartCount />
        </div>

        <Switch>
          <Route path="/cart" component={Cart} />
          <Route path="/products/:productId" component={ViewProduct} />
          <Route path="/products" component={Products} />
          <Route path="/" component={Home} />
        </Switch>
      </CartProvider>
    </>
  );
}

export default App;
