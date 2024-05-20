import ProductInfo from "@/components/ProductInfo/ProductInfo";
import IProduct from "@/interface/IProduct";
import { FC } from "react";
import { useLoaderData } from "react-router-dom";
import styles from "./ProductScreens.module.scss";
import RelatedProducts from "./RelatedProducts";
import TabsProduct from "./TabsProduct";

const ProductScreens: FC = () => {
  const product = useLoaderData() as IProduct;

  return (
    <>
      <div className="container">
        <div className={styles.info}>
          <ProductInfo product={product} />
        </div>
        <TabsProduct />
        <RelatedProducts />
      </div>
    </>
  );
};

export default ProductScreens;
