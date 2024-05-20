import ProductCard from "@/components/ProductCard/ProductCard";
import { products } from "@/date/products";
import IProduct from "@/interface/IProduct";
import { FC, useEffect, useState } from "react";
import styles from "./ProductScreens.module.scss";
import { getRandomSaleProducts } from "@/utils";
const RelatedProducts: FC = () => {
  const [randomSaleProducts, setRandomSaleProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    const saleProducts = getRandomSaleProducts(4, products);
    setRandomSaleProducts(saleProducts);
  }, []);
  return (
    <>
      <div className="mt-20">
        <h3 className="font-semibold text-3xl text-center">Related Products</h3>
        ,
        <div className={styles.related}>
          {randomSaleProducts.map((item) => (
            <ProductCard product={item} />
          ))}
        </div>
      </div>
    </>
  );
};

export default RelatedProducts;
