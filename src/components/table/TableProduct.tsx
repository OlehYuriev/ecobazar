import { FC } from "react";
import styles from "./table.module.scss";
import { useTranslation } from "react-i18next";
import { IProductSubtotal } from "@/interface/IProduct";

interface IProps {
  tableArray: IProductSubtotal[];
}

const TableProduct: FC<IProps> = ({ tableArray }) => {
  const { t } = useTranslation();
  console.log(tableArray);
  return (
    <>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead className="bg-gray-scale-gray-50 py-3 px-6 uppercase text-gray-scale-gray-700 h-9 text-left text-xs">
            <tr>
              <th className="pl-6">{t("Product")}</th>
              <th>{t("categoriesPage.Price")}</th>
              <th>{t("quantity")}</th>
              <th>{t("Subtotal")}</th>
            </tr>
          </thead>
          <tbody>
            {tableArray.map((item) => (
              <tr
                className="text-left text-gray-scale-gray-800"
                key={item.name}
              >
                <td className="pl-6">
                  <div className="flex items-center gap-x-3">
                    <img
                      src={`/img/products/${item.img[0]}.png`}
                      alt={item.name}
                      className="w-16"
                    />
                    {t(`products.${item.name}.name`)}
                  </div>
                </td>
                <td>{item.price}</td>
                <td>x{item.quantity}</td>
                <td>{item.subtotal}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
export default TableProduct;
