import { FC } from "react";
import styles from "./OrderItemScreens.module.scss";
import IProductOrder from "@/interface/IProductOrder";

interface IProps {
  order: IProductOrder;
}

const OrderItemAddress: FC<IProps> = ({ order }) => {
  return (
    <>
      {" "}
      <div className="border border-gray-scale-gray-100 rounded-lg grid grid-cols-2">
        <div className={`${styles.item}  pb-4`}>
          <div className="border-b border-gray-scale-gray-100">
            <h3 className="py-4 px-5 uppercase text-gray-scale-gray-400">
              Billing Address
            </h3>
          </div>

          <div className="px-5">
            {order.firstName} {order.lastName}
          </div>
          <div className="text-gray-scale-gray-600 px-5">
            {order.streetAddress}
          </div>
          <div className="px-5">
            <h5 className="text-gray-scale-gray-400 uppercase text-xs font-medium">
              Email
            </h5>
            <span>{order.email}</span>
          </div>
          <div className="px-5">
            <h5 className="text-gray-scale-gray-400 uppercase text-xs font-medium">
              Phone
            </h5>
            <span>{order.phone}</span>
          </div>
        </div>
        <div
          className={`${styles.item} border-l border-gray-scale-gray-100 pb-4`}
        >
          <div className="border-b border-gray-scale-gray-100">
            <h3 className="py-4 px-5 uppercase text-gray-scale-gray-400">
              Shipping Address
            </h3>
          </div>

          <div className="px-5 text-base">Ecobazar</div>
          <div className="text-gray-scale-gray-600 px-5">
            4140 Parker Rd. Allentown, New Mexico 31134 4
          </div>
          <div className="px-5">
            <h5 className="text-gray-scale-gray-400 uppercase text-xs font-medium">
              Email
            </h5>
            <span>dainne.ressell@gmail.com</span>
          </div>
          <div className="px-5">
            <h5 className="text-gray-scale-gray-400 uppercase text-xs font-medium">
              Phone
            </h5>
            <span>(219) 555-0114</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderItemAddress;
