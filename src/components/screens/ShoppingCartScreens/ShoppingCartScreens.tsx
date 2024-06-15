import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useTranslation } from "react-i18next";
import AccountTable from "@/components/table/AccountTable";
import styles from "./ShoppingCart.module.scss";
import { currencyChange, getTotalPrice, handleUsdAmountChange } from "@/utils";
import useExchangeRate from "@/hooks/useExchangeRate";
import ButtonMain from "@/components/ui/buttons/ButtonMain";
import { useNavigate } from "react-router-dom";

const ShoppingCartScreens = () => {
  const basket = useSelector((state: RootState) => state.basket.productsBasket);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { exchangeRate, currency } = useExchangeRate();
  const TotalPrice = getTotalPrice(basket);

  return (
    <>
      <section>
        <h1 className="font-semibold text-center text-3xl">
          {t("MyShoppingCart")}
        </h1>
        {basket.length ? (
          <div className="overflow-auto mt-8">
            <AccountTable
              type="basket"
              tableArray={basket}
              columns={[
                t("Product"),
                t("categoriesPage.Price"),
                t("quantity"),
                t("Subtotal"),
                " ",
              ]}
            />
            <div className={`${styles.container} border-x-2 border-b-2`}>
              <div className="border-b-2">
                <div className="text-base py-4 flex justify-between items-center px-6">
                  <span>{t("Total")}</span>
                  <span className="font-semibold">
                    {currencyChange(currency)}
                    {handleUsdAmountChange(TotalPrice, exchangeRate, currency)}
                  </span>
                </div>
              </div>
              <div className="px-6 py-4 flex justify-between">
                <div>
                  <ButtonMain
                    value={t("ReturnShop")}
                    fun={() => {
                      navigate("/categories");
                    }}
                  />
                </div>
                <div>
                  <ButtonMain
                    value={t("Checkout")}
                    fun={() => {
                      navigate("/checkout");
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <h3 className=" font-semibold text-center mt-9 text-3xl text-branding-warning">
            {t("ThereNoProducts")}
          </h3>
        )}
      </section>
    </>
  );
};

export default ShoppingCartScreens;
