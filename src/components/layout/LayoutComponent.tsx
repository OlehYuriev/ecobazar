import { FC, Suspense } from "react";
import HeaderComponent from "../Header/HeaderComponent";
import { Outlet } from "react-router-dom";
import FooterComponent from "../footer/FooterComponent";
import LoaderComponent from "../ui/loader/LoaderComponent";

const LayoutComponent: FC = () => {
  return (
    <>
      <HeaderComponent />
      <main>
        <Suspense fallback={<LoaderComponent />}>
          <Outlet />
        </Suspense>
      </main>
      <FooterComponent />
    </>
  );
};

export default LayoutComponent;
