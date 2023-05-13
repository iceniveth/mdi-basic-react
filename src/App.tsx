import { Link, Route, Switch } from "wouter";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ViewProduct from "./pages/ViewProduct";

export type TodoItemType = {
  id: number;
  task: string;
  checked: boolean;
};

function App() {
  return (
    <>
      <div style={{ display: "flex", gap: "8px" }}>
        <Link href="/">Home</Link>
        <Link href="/products">Products</Link>
      </div>

      <Switch>
        <Route path="/products/:productId" component={ViewProduct} />
        <Route path="/products" component={Products} />
        <Route path="/" component={Home} />
      </Switch>
    </>
  );
}

export default App;
