import { FunctionComponent, useEffect, useState } from "react";
import { RouteComponentProps } from "wouter";
import { Product } from "./Products";

const ViewProduct: FunctionComponent<RouteComponentProps> = ({ params }) => {
  const [product, setProduct] = useState<Product | undefined>();

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${params.productId}`)
      .then((res) => res.json())
      .then((json) => setProduct(json));
  }, []);

  console.log(product)

  return (
    <>
      <h2>View Product</h2>
      {/* TODO implement viewing of product page. 
      The API of "Get a single product": https://fakestoreapi.com/docs */}
    </>
  );
};

export default ViewProduct;
