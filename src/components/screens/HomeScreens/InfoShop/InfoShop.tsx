import { FC } from "react";
import { TbTruckDelivery } from "react-icons/tb";
import { BsHeadset } from "react-icons/bs";
import { BsBagCheck } from "react-icons/bs";
import { PiPackage } from "react-icons/pi";
import { useTranslation } from "react-i18next";
import styles from "./InfoShop.module.scss";

const InfoShop: FC = () => {
  const { t } = useTranslation();
  const info = [
    {
      icon: <TbTruckDelivery />,
      title: t("home.ShippingFree"),
      description: t("home.freeShipping"),
    },
    {
      icon: <BsHeadset />,
      title: t("home.CustomerSupport"),
      description: t("home.InstantAccess"),
    },
    {
      icon: <BsBagCheck />,
      title: t("home.SecurePayment"),
      description: t("home.moneySave"),
    },
    {
      icon: <PiPackage />,
      title: t("home.MoneyBack"),
      description: t("home.30Days"),
    },
  ];
  return (
    <>
      <section className="mt-6">
        <div className="container">
          <div className="bg-white shadow-info py-10 rounded-lg">
            <ol className={styles.items}>
              {info.map((item) => {
                return (
                  <li key={item.title} className="flex px-2 ">
                    <div className="text-branding-success text-4xl mr-4">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-base text-balance">
                        {item.title}
                      </h4>
                      <p className="text-gray-scale-gray-400">
                        {item.description}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </section>
    </>
  );
};

export default InfoShop;
