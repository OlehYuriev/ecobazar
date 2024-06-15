import { FC } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { removeProduct } from "@/store/basket/basketSlice";
import IProduct from "@/interface/IProduct";
import { calculateDiscountedPrice } from "@/utils";
import useExchangeRate from "@/hooks/useExchangeRate";
import { handleUsdAmountChange, currencyChange } from "@/utils";
import { useTranslation } from "react-i18next";
import QuantityBasket from "../QuantityBasket/QuantityBasket";

interface IProps {
  basket: IProduct[];
}

const ModalItemBasket: FC<IProps> = ({ basket }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { exchangeRate, currency } = useExchangeRate();
  return (
    <>
      {basket.map((item) => (
        <div key={item.name} className="flex justify-between items-center">
          <div className="flex items-center">
            <img src="../img/apple.png" alt="apple" className="max-w-32" />
            <div className="flex flex-col w-52">
              <h5>{t(`products.${item.name}.name`)}</h5>

              <div className="flex items-center">
                <QuantityBasket product={item} />
                <span className=" font-semibold ml-4">
                  {currencyChange(currency)}
                  {handleUsdAmountChange(
                    calculateDiscountedPrice(item),
                    exchangeRate,
                    currency
                  )}
                </span>
              </div>
            </div>
          </div>

          <button
            className="text-gray-scale-gray-600"
            onClick={() => dispatch(removeProduct(item))}
          >
            <IoCloseCircleOutline fontSize="1.5rem" />
          </button>
        </div>
      ))}
    </>
  );
};

export default ModalItemBasket;
