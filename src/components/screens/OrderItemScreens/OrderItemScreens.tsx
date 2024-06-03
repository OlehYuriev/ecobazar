import useAuth from "@/hooks/useAuth";
import IProductOrder from "@/interface/IProductOrder";
import { Link, useLoaderData } from "react-router-dom";
import styles from "./OrderItemScreens.module.scss";
import OrderItemAddress from "./OrderItemAddress";
import TableProduct from "@/components/table/TableProduct";

const OrderItemScreens = () => {
  const authUser = useAuth();
  const order = useLoaderData() as IProductOrder;

  return (
    <>
      {authUser && order ? (
        <section className="border border-gray-scale-gray-100 rounded-lg ">
          <div className="border-b border-gray-scale-gray-100">
            <div className="flex items-center justify-between py-4 px-6">
              <h1 className="text-gray-scale-gray-700 ">
                <span className="text-xl font-medium">Order Details </span>•{" "}
                <span>{order.dateProduct}</span> •
                <span> {order.order.basketWithSubtotal.length} Products</span>
              </h1>
              <Link
                to={"/account/order"}
                className="text-branding-success text-base hover:text-branding-warning transition-all"
              >
                Back to List
              </Link>
            </div>
          </div>
          <div className={styles.info}>
            <OrderItemAddress order={order} />
            <div className="border border-gray-scale-gray-100 rounded-lg">
              <div className="px-5 py-4 flex">
                <div className="w-2/5">
                  <h5 className="text-gray-scale-gray-400 uppercase text-xs font-medium pb-1.5">
                    Order ID:
                  </h5>
                  <span>#{order.idOrder}</span>
                </div>
                <div className="w-3/5 border-l-2 border-gray-scale-gray-100 pl-5">
                  <h5 className="text-gray-scale-gray-400 uppercase text-xs font-medium pb-1.5">
                    Payment Method:
                  </h5>
                  <span>{order.payment}</span>
                </div>
              </div>
              <div className="px-5 py-4 border-t border-gray-scale-gray-100">
                <div className="pb-3 border-b border-gray-scale-gray-100 flex items-center justify-between">
                  <span className="text-gray-scale-gray-600">Subtotal:</span>
                  <span className="font-medium">${order.totalPrice}</span>
                </div>
                <div className="py-3 border-b border-gray-scale-gray-100 flex items-center justify-between">
                  <span className="text-gray-scale-gray-600">Discount:</span>
                  <span className="font-medium">0%</span>
                </div>
                <div className="py-3 border-b border-gray-scale-gray-100 flex items-center justify-between">
                  <span className="text-gray-scale-gray-600">Shipping:</span>
                  <span className="font-medium">Free</span>
                </div>
                <div className="pt-3  flex items-center justify-between text-lg">
                  <span>Total</span>
                  <span className="font-semibold text-branding-success-dark">
                    ${order.totalPrice}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="overflow-auto">
            <TableProduct tableArray={order} />
          </div>
        </section>
      ) : (
        <p>order not found</p>
      )}
    </>
  );
};

export default OrderItemScreens;
