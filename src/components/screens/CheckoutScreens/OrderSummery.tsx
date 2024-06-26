import { FC } from "react";
import { calculateDiscountedPrice } from "@/utils";
import RadioButton from "@/components/ui/input/RadioButton";
import ButtonMain from "@/components/ui/buttons/ButtonMain";
import IProduct from "@/interface/IProduct";
import { IInfoSend } from "@/interface/IInfo";
import useExchangeRate from "@/hooks/useExchangeRate";
import { handleUsdAmountChange, currencyChange } from "@/utils";
import { useTranslation } from "react-i18next";

interface IProps {
  basket: IProduct[];
  TotalPrice: number;
  placeOrder: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  radioOption: string;
  setRadioOption: React.Dispatch<React.SetStateAction<string>>;
  error: string;
  info: IInfoSend;
}

const OrderSummery: FC<IProps> = ({
  info,
  basket,
  TotalPrice,
  placeOrder,
  radioOption,
  setRadioOption,
  error,
}) => {
  const { exchangeRate, currency } = useExchangeRate();
  const { t } = useTranslation();
  return (
    <>
      <div className="border border-gray-scale-gray-100 rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-3">{t("OrderSummery")}</h3>
        {basket.map((product) => (
          <div
            key={product.name}
            className="flex items-center   justify-between"
          >
            <div className="flex items-center">
              <img
                src={`../img/products/${product.img[0]}.png`}
                alt={product.name}
                className="w-16"
              />
              <div>
                <span>{t(`products.${product.name}.name`)}</span>
                <span className="ml-1.5">X{product.quantity}</span>
              </div>
            </div>
            <span className="font-medium">
              {currencyChange(currency)}
              {handleUsdAmountChange(
                calculateDiscountedPrice(product),
                exchangeRate,
                currency
              )}
            </span>
          </div>
        ))}

        <div className="w-96">
          <div className="flex justify-between py-3">
            <span className="gray-scale-gray-700">{t("Subtotal")}</span>
            <span className="font-medium">
              {currencyChange(currency)}
              {handleUsdAmountChange(TotalPrice, exchangeRate, currency)}
            </span>
          </div>
          <div className="flex justify-between py-3 border-t border-gray-scale-gray-100">
            <span className="gray-scale-gray-700">{t("Shipping")}</span>
            <span className="font-medium">{t("Free")}</span>
          </div>
          <div className="flex justify-between py-3 border-t border-gray-scale-gray-100">
            <span className="gray-scale-gray-700">{t("Total")}</span>
            <span className="font-semibold text-lg">
              {currencyChange(currency)}
              {handleUsdAmountChange(TotalPrice, exchangeRate, currency)}
            </span>
          </div>
        </div>
        <div className="mt-6">
          <h3 className="text-xl font-semibold">{t("PaymentMethod")}</h3>
          <form
            action=""
            className="mt-4 flex flex-col gap-y-2.5"
            onSubmit={placeOrder}
          >
            <RadioButton
              radioOption={radioOption}
              setRadioOption={setRadioOption}
              value="Cash on Delivery"
              label={t("CashDelivery")}
            />
            <RadioButton
              radioOption={radioOption}
              setRadioOption={setRadioOption}
              value="Paypal"
              label="Paypal"
            />
            <RadioButton
              radioOption={radioOption}
              setRadioOption={setRadioOption}
              value="Amazon Pay"
              label="Amazon Pay"
            />
            <div className="mt-6">
              <ButtonMain
                value={t("PlaceOrder")}
                type="submit"
                disabled={
                  !info.firstName ||
                  !info.lastName ||
                  !info.email ||
                  !info.phone ||
                  !info.streetAddress
                }
              />
            </div>
          </form>
          {error && (
            <p className=" text-red-600">
              {t("Errors.Error")}: {error}
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default OrderSummery;
