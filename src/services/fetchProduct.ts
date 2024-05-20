import { products } from "@/date/products";
import IProduct from "@/interface/IProduct";
import { LoaderFunctionArgs } from "react-router-dom";

export function fetchProduct({ params }: LoaderFunctionArgs): IProduct | null {
  const productItem = products.find((product) => {
    return params.name == product.name;
  });
  if (!productItem) {
    throw new Response("Product not found", { status: 404 });
  }

  return productItem;
}
