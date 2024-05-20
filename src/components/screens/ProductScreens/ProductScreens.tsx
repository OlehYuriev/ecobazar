import ProductInfo from "@/components/ProductInfo/ProductInfo";
import IProduct from "@/interface/IProduct";
import { FC } from "react";
import { useLoaderData } from "react-router-dom";

const ProductScreens: FC = () => {
  const product = useLoaderData() as IProduct;

  return (
    <>
      <div className=" flex gap-x-4  h-screen container ">
        <ProductInfo product={product} />
      </div>
    </>
  );
};

export default ProductScreens;
