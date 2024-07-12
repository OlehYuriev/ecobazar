import ButtonMain from "@/components/ui/buttons/ButtonMain";
import styles from "./BannerDiscount.module.scss";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const BannerDiscount = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  function linkCategories() {
    navigate("/categories");
  }
  return (
    <>
      <section className="mt-14 ">
        <div className="container">
          <div className={styles.banner}>
            <div className="flex justify-end text-white">
              <div className="text-base">
                <h5 className="uppercase  font-semibold ">
                  {t("home.SummerSale")}
                </h5>
                <p className="text-6xl font-semibold text-branding-warning mt-3">
                  37%{" "}
                  {i18n.language === "en" && (
                    <span className="text-white">OFF</span>
                  )}
                </p>
                <p className=" opacity-70 max-w-md mt-4">
                  {t("home.FreeOnAll")}
                </p>
                <div className="inline-block mt-7">
                  <ButtonMain value={t("links.ShopNow")} fun={linkCategories} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BannerDiscount;
