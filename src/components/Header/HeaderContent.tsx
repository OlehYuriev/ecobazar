import { FC, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.scss";
import { FaRegHeart } from "react-icons/fa";
import { RiShoppingBagLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import HeaderSearch from "./HeaderSearch";
import ModalBasket from "../ModalBasket/ModalBasket";
import { getTotalPrice } from "@/utils";
import useExchangeRate from "@/hooks/useExchangeRate";
import { handleUsdAmountChange, currencyChange } from "@/utils";

const HeaderContent: FC = () => {
  const { exchangeRate, currency } = useExchangeRate();
  const basket = useSelector((state: RootState) => state.basket.productsBasket);
  const [isModal, setIsModal] = useState(false);
  const TotalPrice = getTotalPrice(basket);
  function openBasketModal() {
    setIsModal(true);
  }
  return (
    <>
      <div className="container">
        <div className="py-6 flex justify-between items-center">
          <Link to="/">
            <img src="../img/Logo.svg" alt="ecobazar" className="h-9" />
          </Link>
          <HeaderSearch />

          <div className="flex items-center">
            <div className="pr-4">
              <button type="button" className="relative">
                <FaRegHeart fontSize="2rem" />
              </button>
            </div>
            <div className="border-l-2 border-gray-scale-gray-100 pl-4 flex">
              <button
                type="button"
                className="relative"
                onClick={openBasketModal}
              >
                {basket.length !== 0 && (
                  <span className={styles.circle}>
                    <span>{basket.length}</span>
                  </span>
                )}

                <RiShoppingBagLine fontSize="2rem" />
              </button>
              <div className="flex flex-col ml-2">
                <span className="text-gray-scale-gray-700">Shopping cart:</span>
                <span className="font-medium">
                  {currencyChange(currency)}
                  {handleUsdAmountChange(TotalPrice, exchangeRate, currency)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ModalBasket isModal={isModal} setIsModal={setIsModal} />
    </>
  );
};

export default HeaderContent;
