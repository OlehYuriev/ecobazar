import { FC } from "react";
import BannersHome from "./BannersHome/BannersHome";
import InfoShop from "./InfoShop/InfoShop";
import CategoriesHome from "./CategoriesHome/CategoriesHome";
import PopularProducts from "./PopularProducts/PopularProducts";

const HomeScreens: FC = () => {
  return (
    <>
      <BannersHome />
      <InfoShop />
      <CategoriesHome />
      <PopularProducts />
    </>
  );
};
export default HomeScreens;
