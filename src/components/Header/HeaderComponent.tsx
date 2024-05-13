import { FC } from "react";

import HeaderTop from "./HeaderTop";
import HeaderContent from "./HeaderContent";
import HeaderNavigation from "./HeaderNavigation";
const HeaderComponent: FC = () => {
  return (
    <>
      <header>
        <HeaderTop />
        <HeaderContent />
        <HeaderNavigation />
      </header>
    </>
  );
};

export default HeaderComponent;
