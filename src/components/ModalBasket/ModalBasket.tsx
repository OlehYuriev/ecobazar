import { FC } from "react";
import styles from "./ModalBasket.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { IoMdClose } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import ModalItemBasket from "./ModalItemBasket";
import { getTotalPrice } from "@/utils";
import ButtonMain from "../ui/buttons/ButtonMain";
import useExchangeRate from "@/hooks/useExchangeRate";
import { handleUsdAmountChange, currencyChange } from "@/utils";
import { useTranslation } from "react-i18next";
import useAuth from "@/hooks/useAuth";
import useBodyOverflow from "@/hooks/useBodyOverflow";

interface IProps {
  isModal: boolean;
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
}
const ModalBasket: FC<IProps> = ({ isModal, setIsModal }) => {
  const { exchangeRate, currency } = useExchangeRate();

  const { t } = useTranslation();
  const userAuth = useAuth();
  const basket = useSelector((state: RootState) => state.basket.productsBasket);
  const navigate = useNavigate();
  const TotalPrice = getTotalPrice(basket);
  function closeBasketModal() {
    setIsModal(false);
  }

  function navigateCheckout() {
    closeBasketModal();
    navigate("/checkout");
  }
  useBodyOverflow(isModal);
  return (
    <>
      <section
        className={`${styles.basket} ${isModal ? styles.basket_active : ""}`}
      >
        <div className="bg-white p-10 flex flex-col justify-between overflow-auto">
          <div>
            <div className="flex justify-between items-center ">
              <h5 className="font-medium text-xl">
                {t("header.basket")} ({basket.length})
              </h5>
              <span className="cursor-pointer ml-24" onClick={closeBasketModal}>
                <IoMdClose fontSize="1.63rem" />
              </span>
            </div>
            <div className={styles.items}>
              <ModalItemBasket basket={basket} />
            </div>
          </div>
          <div>
            <div className="flex justify-between items-center py-6">
              <span>
                {basket.length}{" "}
                {t("productName.product", { count: basket.length })}
              </span>
              <span className="font-semibold">
                {currencyChange(currency)}
                {handleUsdAmountChange(TotalPrice, exchangeRate, currency)}
              </span>
            </div>
            <ButtonMain value={t("Checkout")} fun={navigateCheckout} />
            {userAuth && (
              <Link
                to={"/account/shoppingCart"}
                className="text-branding-success text-base bg-gray-scale-gray-100  p-4 flex rounded-56 
					 justify-center mt-4 hover:bg-branding-success hover:text-branding-warning transition-all"
              >
                {t("GoCart")}
              </Link>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default ModalBasket;
