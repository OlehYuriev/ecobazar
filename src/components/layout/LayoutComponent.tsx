import { FC } from "react";
import HeaderComponent from "../Header/HeaderComponent";
import { Outlet } from "react-router-dom";

const LayoutComponent: FC = () => {
  return (
    <>
      <HeaderComponent />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default LayoutComponent;
