import { FC } from "react";
import TitleSection from "../TitleSection/TitleSection";
import ProductCard from "@/components/ProductCard/ProductCard";
import { products } from "@/date/products";
import styles from "./PopularProducts.module.scss";
import { useTranslation } from "react-i18next";

const PopularProducts: FC = () => {
  const { t } = useTranslation();
  return (
    <>
      <section className="mt-14">
        <div className="container">
          <TitleSection title={t("home.PopularProducts")} />
          <div className={styles.items}>
            {products.map((product) => {
              return <ProductCard product={product} key={product.name} />;
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default PopularProducts;
