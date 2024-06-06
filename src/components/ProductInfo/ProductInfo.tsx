import { FC, useState } from "react";
import SliderComponent from "../slider/SliderComponent";
import styles from "./ProductInfo.module.scss";
import IProduct from "@/interface/IProduct";
import { calculateDiscountedPrice } from "@/utils";
import ButtonQuantity from "../ui/buttons/ButtonQuantity";
import { useDispatch } from "react-redux";
import { addProduct } from "@/store/basket/basketSlice";
import ButtonMain from "../ui/buttons/ButtonMain";
import useExchangeRate from "@/hooks/useExchangeRate";
import { handleUsdAmountChange, currencyChange } from "@/utils";

interface IProps {
  product: IProduct;
}

const ProductInfo: FC<IProps> = ({ product }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(product.quantity);
  const { exchangeRate, currency } = useExchangeRate();

  function addBasket(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent> | undefined
  ) {
    if (e) {
      e.preventDefault();
      dispatch(addProduct({ ...product, quantity }));
    }
  }
  function addQuantity() {
    setQuantity(quantity + 1);
  }

  function subtractQuantity() {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  }

  return (
    <>
      <div className={styles.product}>
        <SliderComponent />
        <div className={styles.content}>
          <h2 className="font-semibold text-4xl">{product.name}</h2>
          <div className="mt-5">
            {product.sale ? (
              <div className="flex items-center">
                <span className="text-gray-scale-gray-400 font-normal line-through ml-1 text-xl">
                  {currencyChange(currency)}
                  {handleUsdAmountChange(product.price, exchangeRate, currency)}
                </span>
                <span className="font-medium text-2xl text-branding-success-dark ml-1.5">
                  {currencyChange(currency)}
                  {handleUsdAmountChange(
                    calculateDiscountedPrice(product),
                    exchangeRate,
                    currency
                  )}
                </span>
                <span className="ml-1.5 text-branding-error bg-branding-error bg-opacity-10 font-medium py-1 px-2.5 rounded-3xl">
                  {product.sale}% Off
                </span>
              </div>
            ) : (
              <span className="font-medium text-2xl text-branding-success-dark">
                {currencyChange(currency)}
                {handleUsdAmountChange(product.price, exchangeRate, currency)}
              </span>
            )}
          </div>
          <div className="border-t border-gray-scale-gray-100  mt-6 pt-6">
            <p className="max-w-xl text text-gray-scale-gray-500 ">
              {product.description}
            </p>
          </div>
          <div className="pt-6 border-t border-gray-scale-gray-100 mt-6 flex items-center gap-x-3">
            <div className="flex items-center gap-x-3">
              <ButtonQuantity value="-" fun={subtractQuantity} />
              <span>{quantity}</span>
              <ButtonQuantity value="+" fun={addQuantity} />
            </div>
            <ButtonMain value="Add to Cart" fun={(e) => addBasket(e)} />
          </div>
          <div className="pt-6 border-t border-gray-scale-gray-100 mt-6 font-medium">
            Category:{" "}
            <span className=" font-normal text-gray-scale-gray-500">
              {product.category}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductInfo;
