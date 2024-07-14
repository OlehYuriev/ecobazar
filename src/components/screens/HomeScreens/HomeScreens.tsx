import { FC, lazy } from "react";
import BannersHome from "./BannersHome/BannersHome";
import InfoShop from "./InfoShop/InfoShop";

const CategoriesHome = lazy(() => import("./CategoriesHome/CategoriesHome"));
const PopularProducts = lazy(() => import("./PopularProducts/PopularProducts"));
const BannerDiscount = lazy(() => import("./BannerDuscount/BannerDiscount"));
const TeamComponent = lazy(
  () => import("@/components/TeamComponent/TeamComponent")
);
const FeaturedProducts = lazy(
  () => import("./FeaturedProducts/FeaturedProducts")
);
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
