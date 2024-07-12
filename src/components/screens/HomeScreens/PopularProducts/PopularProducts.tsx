import { FC, useEffect, useState } from "react";
import TitleSection from "../TitleSection/TitleSection";
import ProductCard from "@/components/ProductCard/ProductCard";
import { products } from "@/date/products";
import styles from "./PopularProducts.module.scss";
import { useTranslation } from "react-i18next";
import IProduct from "@/interface/IProduct";
import { getRandomSaleProducts } from "@/utils";

const PopularProducts: FC = () => {
  const { t } = useTranslation();
  const [randomSaleProducts, setRandomSaleProducts] = useState<IProduct[]>([]);
  const [numOfProducts, setNumOfProducts] = useState<number>(10);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 961) {
        setNumOfProducts(6);
      } else if (window.innerWidth < 1200) {
        setNumOfProducts(8);
      } else {
        setNumOfProducts(10);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const saleProducts = products.filter(
      (product) => product.sale && product.sale > 0
    );
    const randomProducts = getRandomSaleProducts(numOfProducts, saleProducts);
    setRandomSaleProducts(randomProducts);
  }, [numOfProducts]);
  return (
    <>
      <section className="mt-14">
        <div className="container">
          <TitleSection title={t("categoriesPage.SaleProducts")} />
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

export default PopularProducts;
