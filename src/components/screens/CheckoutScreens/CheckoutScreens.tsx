import { FC } from "react";
import CheckoutForm from "./CheckoutForm";
import OrderSummery from "./OrderSummery";

const CheckoutScreens: FC = () => {
  return (
    <>
      <section>
        <div className="container">
          <div className="flex mt-8 gap-x-6">
            <CheckoutForm />
            <OrderSummery />
          </div>
        </div>
      </section>
    </>
  );
};

export default CheckoutScreens;
