import HomeScreens from "@/components/screens/HomeScreens/HomeScreens";

import { FC } from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
const HomePage: FC = () => {
  const { i18n } = useTranslation();
  return (
    <>
      {i18n.language === "ua" ? (
        <Helmet>
          <title>Купити свіжі овочі онлайн | Інтернет-магазин овочів</title>
          <meta
            name="description"
            content="Замовляйте свіжі овочі з доставкою по Україні. Широкий вибір якісних продуктів за доступними цінами."
          />
          <meta
            name="keywords"
            content="свіжі овочі, купити овочі, овочі онлайн, доставка овочів"
          />
          <meta
            property="og:title"
            content="Купити свіжі овочі онлайн | Інтернет-магазин овочів"
          />
          <meta
            property="og:description"
            content="Замовляйте свіжі овочі з доставкою по Україні. Широкий вибір якісних продуктів за доступними цінами."
          />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://ecobazar-c9bab.web.app/" />
          <meta property="og:image" content="/img/Bannar.jpg" />
          <meta property="og:locale" content="uk_UA" />
        </Helmet>
      ) : (
        <Helmet>
          <title>
            Buy fresh vegetables online | Online store of vegetables
          </title>
          <meta
            name="description"
            content="Order fresh vegetables with delivery across Ukraine. A wide selection of quality products at affordable prices."
          />
          <meta
            name="keywords"
            content="fresh vegetables, buy vegetables, vegetables online, delivery of vegetables"
          />
          <meta
            property="og:title"
            content="Buy fresh vegetables online | Online store of vegetables"
          />
          <meta
            property="og:description"
            content="Order fresh vegetables with delivery across Ukraine. A wide selection of quality products at affordable prices."
          />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://ecobazar-c9bab.web.app/" />
          <meta property="og:image" content="/img/Bannar.jpg" />
          <meta property="og:locale" content="en_US" />
        </Helmet>
      )}

      <HomeScreens />
    </>
  );
};

export default HomePage;
