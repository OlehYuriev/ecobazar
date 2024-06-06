import { FC, useEffect, useState } from "react";
import { FaRegHeart } from "react-icons/fa";
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

interface IProps {
  product: IProduct;
}

const ProductCard: FC<IProps> = ({ product }) => {
  const basket = useSelector((state: RootState) => state.basket.productsBasket);

  const dispatch = useDispatch();
  const [isBasket, setIsBasket] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const { exchangeRate, currency } = useExchangeRate();

  useEffect(() => {
    const productExistsInBasket = basket.some(
      (item) => item.name === product.name
    );
    setIsBasket(productExistsInBasket);
  }, [basket, product, isBasket]);

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
      <div>
        <Link to={`/categories/${product.name}`}>
          <div className={styles.item}>
            <div className="relative">
              <img src="../img/apple.png" alt="apple" className="w-full" />
              <button
                type="button"
                className={`${styles.button} ${styles.button_heart}`}
              >
                <FaRegHeart fontSize="1.35rem" />
              </button>
              <button
                type="button"
                className={`${styles.button} ${styles.button_eye}`}
                onClick={(e) => openModal(e)}
              >
                <IoEyeOutline fontSize="1.35rem" />
              </button>
              {product.sale && (
                <span className="absolute top-4 left-4 bg-branding-error font-medium text-white rounded py-1 px-2">
                  Sale {product.sale}%
                </span>
              )}
            </div>
            <div className="flex p-3 items-center justify-between">
              <div>
                <h4 className="text-gray-scale-gray-700">{product.name}</h4>
                {product.sale ? (
                  <span className=" text-base font-medium">
                    <span>
                      {currencyChange(currency)}
                      {handleUsdAmountChange(
                        calculateDiscountedPrice(product),
                        exchangeRate,
                        currency
                      )}
                    </span>
                    <span className="text-gray-scale-gray-400 font-normal line-through ml-1">
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
                className={`p-2.5 rounded-full ${
                  isBasket
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
