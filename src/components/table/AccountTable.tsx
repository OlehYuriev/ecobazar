import { FC } from "react";
import styles from "./table.module.scss";
import { useTranslation } from "react-i18next";
import IProduct from "@/interface/IProduct";
import {
  calculateDiscountedPrice,
  calculateDiscountedPriceOneProduct,
  currencyChange,
  handleUsdAmountChange,
} from "@/utils";
import useExchangeRate from "@/hooks/useExchangeRate";
import { removeProduct, addProduct } from "@/store/basket/basketSlice";
import { removeProductWIshlist } from "@/store/wishlist/wishlistSlice";
import { useDispatch } from "react-redux";
import { IoCloseCircleOutline } from "react-icons/io5";
import ButtonMain from "../ui/buttons/ButtonMain";
import QuantityBasket from "../QuantityBasket/QuantityBasket";

interface IProps {
  tableArray: IProduct[];
  columns: string[];
  type: "wishlist" | "basket";
}

const AccountTable: FC<IProps> = ({ tableArray, columns, type }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { exchangeRate, currency } = useExchangeRate();
  return (
    <>
      <>
        <div
          className={`${styles.tableContainer} ${
            type === "wishlist" ? styles.width : ""
          }`}
        >
          <table
            className={`${styles.table} border-2  border-gray-scale-gray-100 ${
              type === "wishlist" ? styles.width : ""
            }`}
          >
            <thead
              className=" border-b-2   border-gray-scale-gray-100 py-3 px-6 uppercase text-gray-scale-gray-500
				 h-9 text-left text-xs"
            >
              <tr>
                {columns.map((item, index) => (
                  <th className={`${index === 0 ? "pl-6" : ""}`} key={item}>
                    {item}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableArray.map((product) => (
                <tr
                  className=" border-b-2 border-gray-scale-gray-100 text-left text-gray-scale-gray-800 "
                  key={product.name}
                >
                  <td className="pl-6">
                    <div className="flex items-center gap-x-3">
                      <img src="/img/apple.png" alt="sd" className="w-24" />
                      {t(`products.${product.name}.name`)}
                    </div>
                  </td>
                  <td>
                    {product.sale ? (
                      <span className=" text-base font-medium">
                        <span>
                          {currencyChange(currency)}
                          {calculateDiscountedPriceOneProduct(product)}
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
                  </td>
                  <td>
                    {type === "basket" ? (
                      <QuantityBasket product={product} />
                    ) : (
                      <span className="text-branding-success-dark bg-branding-success-bright bg-opacity-70 py-1 px-2 rounded">
                        {t("InStock")}
                      </span>
                    )}
                  </td>
                  {type === "basket" && (
                    <td>
                      {currencyChange(currency)}
                      {handleUsdAmountChange(
                        calculateDiscountedPrice(product),
                        exchangeRate,
                        currency
                      )}
                    </td>
                  )}

                  <td>
                    {type === "basket" ? (
                      <button
                        className="text-gray-scale-gray-600"
                        onClick={() => dispatch(removeProduct(product))}
                      >
                        <IoCloseCircleOutline fontSize="1.5rem" />
                      </button>
                    ) : (
                      <div className="flex gap-2 items-center">
                        <div className="min-w-32">
                          <ButtonMain
                            value={t("AddCart")}
                            fun={() => dispatch(addProduct(product))}
                          />
                        </div>
                        <button
                          className="text-gray-scale-gray-600"
                          onClick={() =>
                            dispatch(removeProductWIshlist(product))
                          }
                        >
                          <IoCloseCircleOutline fontSize="1.5rem" />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    </>
  );
};

export default AccountTable;
