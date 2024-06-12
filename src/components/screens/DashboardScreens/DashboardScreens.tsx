import { FC, useEffect, useState } from "react";
import DashboardInfo from "./DashboardInfo";
import TableOrders from "@/components/table/TableOrders";
import useAuth from "@/hooks/useAuth";
import { ref as databaseRef, onValue } from "firebase/database";
import { database } from "@/firebase";
import IProductOrder from "@/interface/IProductOrder";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const DashboardScreens: FC = () => {
  const authUser = useAuth();
  const [ordersArray, setOrdersArray] = useState<IProductOrder[] | null>(null);
  const { t } = useTranslation();
  useEffect(() => {
    if (authUser) {
      const productsRef = databaseRef(database, "products/" + authUser.uid);
      onValue(productsRef, (snapshot) => {
        const data = snapshot.val();

        if (data) {
          const ordersArray: IProductOrder[] = Object.values(data);
          const reverseArray = ordersArray.reverse().slice(0, 5);
          setOrdersArray(reverseArray);
        } else {
          setOrdersArray(null);
        }
      });
    }
  }, [authUser]);
  return (
    <>
      <div>
        <DashboardInfo />
        <div className="border border-gray-scale-gray-100 rounded-lg mt-6  pb-9">
          <div className="py-4 px-6 flex items-center justify-between">
            <h3 className="text-xl font-medium">{t("RecetOrderHistory")}</h3>
            <Link
              to="/account/order"
              className="text-branding-success hover:text-branding-warning transition-all"
            >
              {t("links.ViewAll")}
            </Link>
          </div>

          {ordersArray ? (
            <div className="overflow-auto">
              <TableOrders tableArray={ordersArray} />
            </div>
          ) : (
            <h5 className="text-center font-semibold text-branding-warning text-3xl">
              {t("NoOrders")}
            </h5>
          )}
        </div>
      </div>
    </>
  );
};

export default DashboardScreens;
