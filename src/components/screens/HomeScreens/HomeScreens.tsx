import { FC } from "react";
import styles from "./HomeScreens.module.scss";
import BannersHome from "./BannersHome/BannersHome";
import InfoShop from "./InfoShop/InfoShop";
import CategoriesHome from "./CateroriesHome/CategoriesHome";
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
