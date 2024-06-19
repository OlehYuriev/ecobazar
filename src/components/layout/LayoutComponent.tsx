import { FC } from "react";
import HeaderComponent from "../Header/HeaderComponent";
import { Outlet } from "react-router-dom";
import FooterComponent from "../footer/FooterComponent";

const LayoutComponent: FC = () => {
  return (
    <>
      <HeaderComponent />
      <main>
        <Outlet />
      </main>
      <FooterComponent />
    </>
  );
};

export default LayoutComponent;
