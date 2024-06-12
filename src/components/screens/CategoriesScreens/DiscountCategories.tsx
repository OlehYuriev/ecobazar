import { FC } from "react";
import { useTranslation } from "react-i18next";

const DiscountCategories: FC = () => {
  const { t } = useTranslation();
  return (
    <>
      <div className="rounded-lg relative">
        <picture>
          <source srcSet="../img/discount.avif" type="image/avif" />
          <source srcSet="../img/discount.webp" type="image/webp" />
          <img
            src="../img/discount.png"
            alt="discount"
            className="rounded-xl w-full"
          />
        </picture>
        <div className="text-center absolute top-5 inset-x-1/4">
          <p className="text-2xl">
            <span className="text-3xl font-semibold text-branding-warning mr-2">
              79%
            </span>
            {t("categoriesPage.Discount")}
          </p>
          <p> {t("categoriesPage.firstOrder")}</p>
        </div>
      </div>
    </>
  );
};

export default DiscountCategories;
