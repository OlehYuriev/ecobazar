import { FC, useEffect, useState } from "react";
import styles from "./OrderItemScreens.module.scss";
import IProductOrder from "@/interface/IProductOrder";
import { useTranslation } from "react-i18next";
import useAuth from "@/hooks/useAuth";
import { ref as databaseRef, onValue } from "firebase/database";
import { database } from "@/firebase";

interface IProps {
  order: IProductOrder;
}

const OrderItemAddress: FC<IProps> = ({ order }) => {
  const { t } = useTranslation();
  const authUser = useAuth();
  const [address, setAddress] = useState<string>("");
  const [Phone, setPhone] = useState<string>("");

  useEffect(() => {
    console.log(authUser);
    if (authUser) {
      // Чтение данных из базы данных
      const userRef = databaseRef(database, "usersAddress/" + authUser.uid);
      onValue(userRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          setAddress(data.userAddress || "");
        }
      });
      const userPhone = databaseRef(database, "usersInfo/" + authUser.uid);
      onValue(userPhone, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          setPhone(data.user?.phoneNumber || "");
        }
      });
    }
  }, [authUser]);
  return (
    <>
      {" "}
      <div className="border border-gray-scale-gray-100 rounded-lg grid grid-cols-2">
        <div className={`${styles.item}  pb-4`}>
          <div className="border-b border-gray-scale-gray-100">
            <h3 className="py-4 px-5 uppercase text-gray-scale-gray-400">
              {t("BillingAddress")}
            </h3>
          </div>

          <div className="px-5">{authUser?.displayName}</div>
          <div className="text-gray-scale-gray-600 px-5">{address}</div>
          <div className="px-5">
            <h5 className="text-gray-scale-gray-400 uppercase text-xs font-medium">
              Email
            </h5>
            <span>{authUser?.email} </span>
          </div>
          <div className="px-5">
            <h5 className="text-gray-scale-gray-400 uppercase text-xs font-medium">
              {t("account.PhoneNumber")}
            </h5>
            <span>{Phone || order.phone}</span>
          </div>
        </div>
        <div
          className={`${styles.item} border-l border-gray-scale-gray-100 pb-4`}
        >
          <div className="border-b border-gray-scale-gray-100">
            <h3 className="py-4 px-5 uppercase text-gray-scale-gray-400">
              {t("ShippingAddress")}
            </h3>
          </div>

          <div className="px-5 text-base">
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
              {t("account.PhoneNumber")}
            </h5>
            <span>{order.phone}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderItemAddress;
