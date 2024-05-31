import { FC } from "react";

import { calculateDiscountedPrice } from "@/utils";
import RadioButton from "@/components/ui/input/RadioButton";
import ButtonMain from "@/components/ui/buttons/ButtonMain";
import IProduct from "@/interface/IProduct";
import { IInfoSend } from "@/interface/IInfo";

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
  return (
    <>
      <div className="border border-gray-scale-gray-100 rounded-lg p-6">
        <h3 className="text-xl font-medium mb-3">Order Summery</h3>
        {basket.map((product) => (
          <div
            key={product.name}
            className="flex items-center   justify-between"
          >
            <div className="flex items-center">
              <img src="../img/apple.png" alt={product.name} className="w-16" />
              <div>
                <span>{product.name}</span>
                <span className="ml-1.5">X{product.quantity}</span>
              </div>
            </div>
            <span className="font-medium">
              ${calculateDiscountedPrice(product)}
            </span>
          </div>
        ))}

        <div className="w-96">
          <div className="flex justify-between py-3">
            <span className="gray-scale-gray-700">Subtotal:</span>
            <span className="font-medium">${TotalPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between py-3 border-t border-gray-scale-gray-100">
            <span className="gray-scale-gray-700">Shipping:</span>
            <span className="font-medium">Free</span>
          </div>
          <div className="flex justify-between py-3 border-t border-gray-scale-gray-100">
            <span className="gray-scale-gray-700">Total:</span>
            <span className="font-semibold text-lg">
              ${TotalPrice.toFixed(2)}
            </span>
          </div>
        </div>
        <div className="mt-6">
          <h3 className="text-xl font-medium">Payment Method</h3>
          <form
            action=""
            className="mt-4 flex flex-col gap-y-2.5"
            onSubmit={placeOrder}
          >
            <RadioButton
              radioOption={radioOption}
              setRadioOption={setRadioOption}
              value="Cash on Delivery"
            />
            <RadioButton
              radioOption={radioOption}
              setRadioOption={setRadioOption}
              value="Paypal"
            />
            <RadioButton
              radioOption={radioOption}
              setRadioOption={setRadioOption}
              value="Amazon Pay"
            />
            <div className="mt-6">
              <ButtonMain
                value="Place Order"
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
          {error && <p className=" text-red-600">Error: {error}</p>}
        </div>
      </div>
    </>
  );
};

export default OrderSummery;
