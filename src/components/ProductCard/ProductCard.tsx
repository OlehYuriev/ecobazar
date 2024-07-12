import { FC, useState } from "react";
import { RiShoppingBagLine } from "react-icons/ri";
import styles from "./ProductCard.module.scss";
import IProduct from "@/interface/IProduct";
import { useSelector, useDispatch } from "react-redux";
import { addProduct } from "@/store/basket/basketSlice";
import { handleUsdAmountChange, currencyChange } from "@/utils";
import { RootState } from "@/store/store";
import { calculateDiscountedPrice } from "@/utils";
import { IoEyeOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import ModalComponent from "../modal/ModalComponent";
import ProductInfo from "../ProductInfo/ProductInfo";
import useExchangeRate from "@/hooks/useExchangeRate";
import { useTranslation } from "react-i18next";
import useProductExists from "@/hooks/useProductExists";
import AddToWishlistButton from "../AddToWishlistButton/AddToWishlistButton";

interface IProps {
  product: IProduct;
}

const ProductCard: FC<IProps> = ({ product }) => {
  const { t } = useTranslation();
  const basket = useSelector((state: RootState) => state.basket.productsBasket);
  const dispatch = useDispatch();

  const [isModal, setIsModal] = useState(false);
  const { exchangeRate, currency } = useExchangeRate();

  const basketExists = useProductExists(basket, product);

  function addBasket(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    dispatch(addProduct(product));
  }

  function openModal(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setIsModal(true);
  }
  return (
    <>
      <div className={styles.item}>
        <Link to={`/categories/${product.name}`}>
          <div>
            <div className="relative p-1">
              <img
                src={`../img/products/${product.img[0]}.png`}
                alt={product.name}
                className="w-full h-72 object-contain"
              />

              <div className={`${styles.button} ${styles.button_heart}`}>
                <AddToWishlistButton product={product} />
              </div>
              <button
                type="button"
                className={`${styles.button} ${styles.button_opacity} ${styles.button_eye}`}
                onClick={(e) => openModal(e)}
              >
                <IoEyeOutline fontSize="1.35rem" />
              </button>
              {product.sale && (
                <span className="absolute top-4 left-4 bg-branding-error font-medium text-white rounded py-1 px-2">
                  {t("categoriesPage.Sale")} {product.sale}%
                </span>
              )}
            </div>
            <div className="flex p-3 items-center justify-between ">
              <div>
                <h4 className="text-gray-scale-gray-700 pr-3">
                  {t(`products.${product.name}.name`)}
                </h4>
                {product.sale ? (
                  <span className=" text-base font-medium flex flex-wrap gap-1">
                    <span>
                      {currencyChange(currency)}
                      {handleUsdAmountChange(
                        calculateDiscountedPrice(product),
                        exchangeRate,
                        currency
                      )}
                    </span>
                    <span className="text-gray-scale-gray-400 font-normal line-through ">
                      {currencyChange(currency)}
                      {handleUsdAmountChange(
                        product.price,
                        exchangeRate,
                        currency
                      )}
                    </span>
                  </span>
                ) : (
                  <span className=" text-base font-medium">
                    {currencyChange(currency)}
                    {handleUsdAmountChange(
                      product.price,
                      exchangeRate,
                      currency
                    )}
                  </span>
                )}
              </div>

              <button
                className={`p-2.5 rounded-full ml-3 ${
                  basketExists
                    ? "bg-branding-success text-white"
                    : "bg-gray-scale-gray-50"
                }`}
                type="button"
                onClick={(e) => addBasket(e)}
              >
                <RiShoppingBagLine fontSize="1.35rem" />
              </button>
            </div>
          </div>
        </Link>
        <ModalComponent isModal={isModal} setIsModal={setIsModal}>
          <div className={styles.modal}>
            <ProductInfo product={product} />
          </div>
        </ModalComponent>
      </div>
    </>
  );
};

export default ProductCard;
