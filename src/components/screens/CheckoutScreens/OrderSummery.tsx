import { FC, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { getTotalPrice } from "@/utils";
import RadioButton from "@/components/ui/input/RadioButton";
import ButtonMain from "@/components/ui/buttons/ButtonMain";

const OrderSummery: FC = () => {
  const basket = useSelector((state: RootState) => state.basket.productsBasket);
  const TotalPrice = getTotalPrice(basket);
  const [radioOption, setRadioOption] = useState("Cash on Delivery");

  function placeOrder() {
    console.log(radioOption);
  }

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
            <span className="font-medium">${product.price.toFixed(2)}</span>
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
          <form action="" className="mt-4 flex flex-col gap-y-2.5">
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
              <ButtonMain value="Place Order" fun={placeOrder} />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default OrderSummery;
