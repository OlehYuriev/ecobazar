import { FC } from "react";
import styles from "./BannersHome.module.scss";
import LinkComponent from "@/components/ui/link/LinkComponent";
import { useTranslation } from "react-i18next";

const BannersHome: FC = () => {
  const { t, i18n } = useTranslation();

  return (
    <>
      <section>
        <div className="container">
          <div className={styles.HomeScreen}>
            <div className={styles.fresh}>
              <div className={styles.fresh__content}>
                <h1 className={styles.fresh__title}>
                  {t("home.FreshHealthy")}
                </h1>
                <div className="pl-3 border-l-2 border-branding-success-bright mt-8">
                  <p className={styles.fresh__text}>
                    {t("home.SaleUp")}
                    <span className="bg-branding-warning px-3 py-1 rounded-md ml-2">
                      30% {i18n.language === "en" && "OFF"}
                    </span>
                  </p>
                  <p className={styles.fresh__sale}>{t("home.freeShipping")}</p>
                </div>
                <LinkComponent
                  name={t("links.ShopNow")}
                  classes="mt-7 py-4 px-10 bg-white rounded-56 "
                />
              </div>
            </div>
            <div className="gap-y-5 flex flex-col flex-1 md:flex hidden">
              <div className={styles.sale}>
                <div className={styles.sale__content}>
                  <h4 className=" uppercase font-medium">
                    {t("home.SummerSale")}
                  </h4>
                  <h2 className="font-semibold text-3xl">
                    75% {i18n.language === "en" && "OFF"}
                  </h2>
                  <p className="text-gray-scale-gray-600">
                    {t("home.OnlyFruit")}
                  </p>
                  <LinkComponent name={t("links.ShopNow")} classes="mt-3" />
                </div>
              </div>
              <div className={styles.deal}>
                <div className={styles.deal__content}>
                  <h4 className=" uppercase font-medium">
                    {t("home.bestDeal")}
                  </h4>
                  <h2 className="font-semibold text-3xl text-balance">
                    {t("home.specialProducts")}
                  </h2>

                  <LinkComponent name={t("links.ShopNow")} classes="mt-3" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BannersHome;
