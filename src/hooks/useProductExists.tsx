import IProduct from "@/interface/IProduct";
import { useEffect, useState } from "react";

const useProductExists = (items: IProduct[], product: IProduct) => {
  const [productExists, setProductExists] = useState(false);

  useEffect(() => {
    const exists = items.some((item) => item.name === product.name);
    setProductExists(exists);
  }, [items, product]);

  return productExists;
};

export default useProductExists;
