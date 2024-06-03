import { FC } from "react";
import styles from "./table.module.scss";
import IProductOrder from "@/interface/IProductOrder";

interface IProps {
  tableArray: IProductOrder | null;
}
const TableProduct: FC<IProps> = ({ tableArray }) => {
  return (
    <>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead className="bg-gray-scale-gray-50 py-3 px-6 uppercase text-gray-scale-gray-700 h-9 text-left text-xs">
            <tr>
              <th className="pl-6">Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {tableArray?.order.basketWithSubtotal.map((item) => (
              <tr
                className="text-left text-gray-scale-gray-800"
                key={item.name}
              >
                <td className="pl-6">
                  <div className="flex items-center gap-x-3">
                    <img src="/img/apple.png" alt="sd" className="w-16" />
                    {item.name}
                  </div>
                </td>
                <td>${item.price}</td>
                <td>x{item.quantity}</td>
                <td>${item.subtotal}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
export default TableProduct;
