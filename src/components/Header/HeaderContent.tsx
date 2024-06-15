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
import { useTranslation } from "react-i18next";
import ModalComponent from "../modal/ModalComponent";
import AccountTable from "../table/AccountTable";

const HeaderContent: FC = () => {
  const { t } = useTranslation();
  const { exchangeRate, currency } = useExchangeRate();
  const basket = useSelector((state: RootState) => state.basket.productsBasket);
  const wishlist = useSelector(
    (state: RootState) => state.wishlist.productsWishlist
  );
  const [isModal, setIsModal] = useState(false);
  const [isModalWishlist, setIsModalWishlist] = useState(false);
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
              <button
                type="button"
                className="relative"
                onClick={() => setIsModalWishlist(true)}
              >
                {wishlist.length !== 0 && (
                  <span
                    className={`${styles.circle} ${styles.circle_wishlist}`}
                  >
                    <span>{wishlist.length}</span>
                  </span>
                )}
                <FaRegHeart fontSize="1.8rem" />
              </button>
            </div>
            <div className="border-l-2 border-gray-scale-gray-100 pl-4 flex">
              <button
                type="button"
                className="relative"
                onClick={openBasketModal}
              >
                {basket.length !== 0 && (
                  <span className={`${styles.circle} ${styles.circle_basket}`}>
                    <span>{basket.length}</span>
                  </span>
                )}

                <RiShoppingBagLine fontSize="2rem" />
              </button>
              <div className="flex flex-col ml-2">
                <span className="text-gray-scale-gray-700">
                  {t("header.basket")}:
                </span>
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
      <ModalComponent isModal={isModalWishlist} setIsModal={setIsModalWishlist}>
        {wishlist.length ? (
          <div className={styles.modal}>
            <h2 className="font-semibold text-center text-3xl">
              {t("MyWishlist")}
            </h2>
            <div className="overflow-auto mt-3">
              <AccountTable
                type="wishlist"
                tableArray={wishlist}
                columns={[
                  t("Product"),
                  t("categoriesPage.Price"),
                  "Stock Status",
                  " ",
                ]}
              />
            </div>
          </div>
        ) : (
          <div className={styles.modal}>
            <h2 className="font-semibold text-center text-3xl text-branding-warning">
              {t("WishListEmpty")}
            </h2>
          </div>
        )}
      </ModalComponent>
    </>
  );
};

export default HeaderContent;
