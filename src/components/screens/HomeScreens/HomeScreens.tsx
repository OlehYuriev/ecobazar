import { FC } from "react";
import BannersHome from "./BannersHome/BannersHome";
import InfoShop from "./InfoShop/InfoShop";
import CategoriesHome from "./CategoriesHome/CategoriesHome";
import PopularProducts from "./PopularProducts/PopularProducts";
import BannerDiscount from "./BannerDuscount/BannerDiscount";
import TeamComponent from "@/components/TeamComponent/TeamComponent";
import FeaturedProducts from "./FeaturedProducts/FeaturedProducts";

const HomeScreens: FC = () => {
  return (
    <>
      <BannersHome />
      <InfoShop />
      <CategoriesHome />
      <PopularProducts />
      <BannerDiscount />
      <TeamComponent />
      <FeaturedProducts />
    </>
  );
};
export default HomeScreens;
