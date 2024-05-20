import { FC, useEffect, useState } from "react";
import { products } from "@/date/products";
import IProduct from "@/interface/IProduct";
import ProductItem from "@/components/ProductItem/ProductItem";
import { getRandomSaleProducts } from "@/utils";

const SaleProducts: FC = () => {
  const [randomSaleProducts, setRandomSaleProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    const saleProducts = getRandomSaleProducts(3, products);
    setRandomSaleProducts(saleProducts);
  }, []);

  return (
    <>
      <div>
        <h3 className="text-xl font-medium">Sale Products</h3>
        <div className="flex flex-col gap-y-4 mt-3">
          {randomSaleProducts.map((item) => (
            <ProductItem key={item.name} product={item} />
          ))}
        </div>
      </div>
    </>
  );
};

export default SaleProducts;
