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
  useEffect(() => {
    const saleProducts = products.filter(
      (product) => product.sale && product.sale > 0
    );
    const randomProducts = getRandomSaleProducts(10, saleProducts);
    setRandomSaleProducts(randomProducts);
  }, []);
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
