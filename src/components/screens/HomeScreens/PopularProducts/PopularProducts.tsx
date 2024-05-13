import { FC } from "react";
import TitleSection from "../TitleSection/TitleSection";
import ProductCard from "@/components/ProductCard/ProductCard";
import { products } from "@/date/products";
import styles from "./PopularProducts.module.scss";

const PopularProducts: FC = () => {
  return (
    <>
      <section className="mt-14">
        <div className="container">
          <TitleSection title="Popular Products" />
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
