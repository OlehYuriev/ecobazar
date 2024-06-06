import { FC } from "react";
import IProduct from "@/interface/IProduct";
import styles from "./ProductItem.module.scss";
import { calculateDiscountedPrice } from "@/utils";
import { Link } from "react-router-dom";
import useExchangeRate from "@/hooks/useExchangeRate";
import { handleUsdAmountChange, currencyChange } from "@/utils";

interface IProps {
  product: IProduct;
}

const ProductItem: FC<IProps> = ({ product }) => {
  const { exchangeRate, currency } = useExchangeRate();
  return (
    <>
      <Link to={`/categories/${product.name}`}>
        <div className={styles.item}>
          <img src="../img/apple.png" alt="apple" className=" max-w-28" />
          <div>
            <h5 className="text-gray-scale-gray-700">{product.name}</h5>
            <span className=" text-base font-medium mr-2">
              {currencyChange(currency)}
              {handleUsdAmountChange(
                calculateDiscountedPrice(product),
                exchangeRate,
                currency
              )}
            </span>
            <span className="text-base line-through text-gray-scale-gray-400">
              {currencyChange(currency)}
              {handleUsdAmountChange(product.price, exchangeRate, currency)}
            </span>
          </div>
        </div>
      </Link>
    </>
  );
};

export default ProductItem;
