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
  const [numOfProducts, setNumOfProducts] = useState<number>(5);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1200) {
        setNumOfProducts(4);
      } else {
        setNumOfProducts(5);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const saleProducts = getRandomSaleProducts(numOfProducts, products);
    setRandomSaleProducts(saleProducts);
  }, [numOfProducts]);
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
