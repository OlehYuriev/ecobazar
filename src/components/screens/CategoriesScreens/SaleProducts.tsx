import { FC, useEffect, useState } from "react";
import { products } from "@/date/products";
import IProduct from "@/interface/IProduct";
import ProductItem from "@/components/ProductItem/ProductItem";

const SaleProducts: FC = () => {
  const [randomSaleProducts, setRandomSaleProducts] = useState<IProduct[]>([]);

  // Функция для получения случайных продуктов
  function getRandomSaleProducts(maxItems: number): IProduct[] {
    const saleProducts = products.filter(
      (product) => product.sale && product.sale > 0
    );
    const shuffledProducts = saleProducts.sort(() => 0.5 - Math.random());
    return shuffledProducts.slice(0, maxItems);
  }

  useEffect(() => {
    const saleProducts = getRandomSaleProducts(3);
    setRandomSaleProducts(saleProducts);
  }, []);

  return (
    <>
      <div className="">
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
