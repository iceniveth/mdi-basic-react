import { Route, Switch } from "wouter";
import Home from "./pages/Home";
import Products from "./pages/Products";

export type TodoItemType = {
  id: number;
  task: string;
  checked: boolean;
};

function App() {
  return (
    <>
      <Switch>
        <Route path="/products" component={Products} />
        <Route path="/" component={Home} />
      </Switch>
    </>
  );
}

export default App;
