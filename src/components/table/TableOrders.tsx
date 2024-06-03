import { FC } from "react";
import styles from "./table.module.scss";
import IProductOrder from "@/interface/IProductOrder";
import { Link } from "react-router-dom";

interface IProps {
  tableArray: IProductOrder[] | null;
}
const TableOrders: FC<IProps> = ({ tableArray }) => {
  return (
    <>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead className="bg-gray-scale-gray-50 py-3 px-6 uppercase text-gray-scale-gray-700 h-9 text-left text-xs">
            <tr>
              <th className="pl-6">Order ID</th>
              <th>Date</th>
              <th>Total</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {tableArray?.map((item) => (
              <tr
                className="text-left text-gray-scale-gray-800 h-11"
                key={item.idOrder}
              >
                <td className="pl-6">#{item.idOrder}</td>
                <td>{item.dateProduct}</td>
                <td>
                  ${item.totalPrice} ({item.order?.basketWithSubtotal.length}{" "}
                  Products)
                </td>
                <td>Processing</td>
                <td className="text-branding-success hover:text-branding-warning transition-all">
                  <Link to={`/account/order/${item.idOrder}`}>
                    View Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
export default TableOrders;
