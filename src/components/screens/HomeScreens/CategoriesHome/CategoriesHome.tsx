import { FC } from "react";
import TitleSection from "../TitleSection/TitleSection";
import { Link } from "react-router-dom";
import styles from "./CategoriesHome.module.scss";
import { useTranslation } from "react-i18next";

const CategoriesHome: FC = () => {
  const { t } = useTranslation();
  const categories = [
    {
      img: "fruits",
      title: t("categories.FreshFruit"),
      url: "/categories?category=Fresh+Fruit",
    },
    {
      img: "vegetables",
      title: t("categories.FreshVegetables"),
      url: "/categories?category=Fresh+Vegetables",
    },
    {
      img: "meat",
      title: t("categories.MeatFish"),
      url: "/categories?category=Meat+%26+Fish",
    },
    {
      img: "snacks",
      title: t("categories.Snacks"),
      url: "/categories?category=Snacks",
    },
    {
      img: "beverages",
      title: t("categories.Beverages"),
      url: "/categories?category=Beverages",
    },
    {
      img: "beauty",
      title: t("categories.BeautyHealth"),
      url: "/categories?category=Beauty+%26+Health",
    },
  ];
  return (
    <>
      <section className="mt-14">
        <div className="container">
          <div>
            <TitleSection title={t("header.categories")} />
            <div className="flex justify-between mt-12 gap-1.5">
              {categories.map((item) => {
                return (
                  <Link
                    to={item.url}
                    key={item.title}
                    onClick={() => window.scrollTo(0, 0)}
                  >
                    <div className={styles.item}>
                      <picture>
                        <source
                          srcSet={`../img/${item.img}.avif`}
                          type="image/avif"
                        />
                        <source
                          srcSet={`../img/${item.img}.webp`}
                          type="image/webp"
                        />
                        <img src={`../img/${item.img}.jpj`} alt={item.title} />
                      </picture>

                      <h3 className="font-medium text-lg mt-4">{item.title}</h3>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CategoriesHome;
