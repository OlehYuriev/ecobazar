import { useTranslation } from "react-i18next";
import TitleSection from "../TitleSection/TitleSection";
import IProduct from "@/interface/IProduct";
import { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard/ProductCard";
import { products } from "@/date/products";
import { getRandomSaleProducts } from "@/utils";
import styles from "./FeaturedProducts.module.scss";

const FeaturedProducts = () => {
  const { t } = useTranslation();
  const [randomSaleProducts, setRandomSaleProducts] = useState<IProduct[]>([]);
  useEffect(() => {
    const saleProducts = getRandomSaleProducts(5, products);
    setRandomSaleProducts(saleProducts);
  }, []);
  return (
    <>
      <section className="mt-14">
        <div className="container">
          <TitleSection title={t("FeaturedProducts")} />
          <div className={styles.items}>
            {randomSaleProducts.map((product) => {
              return <ProductCard product={product} key={product.name} />;
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default FeaturedProducts;
