import { FC } from "react";
import TitleSection from "../TitleSection/TitleSection";
import { Link } from "react-router-dom";
import styles from "./CategoriesHome.module.scss";

const CategoriesHome: FC = () => {
  const categories = [
    {
      img: "fruits",
      title: "Fresh Fruit",
      url: "/categories?category=Fresh+Fruit",
    },
    {
      img: "vegetables",
      title: "Fresh Vegetables",
      url: "/categories?category=Vegetables",
    },
    { img: "meat", title: "Meat & Fish", url: "/categories" },
    { img: "snacks", title: "Snacks", url: "/categories" },
    { img: "beverages", title: "Beverages", url: "/categories" },
    { img: "beauty", title: "Beauty & Health", url: "/categories" },
  ];
  return (
    <>
      <section className="mt-14">
        <div className="container">
          <div>
            <TitleSection title="Popular Categories" />
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
