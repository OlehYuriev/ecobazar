import useAuth from "@/hooks/useAuth";
import styles from "./DashboardScreens.module.scss";
import { useEffect, useState } from "react";
import { ref as databaseRef, onValue } from "firebase/database";
import { database } from "@/firebase";
const DashboardInfo = () => {
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const authUser = useAuth();

  useEffect(() => {
    if (authUser) {
      const userRef = databaseRef(database, "usersInfo/" + authUser.uid);
      onValue(userRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          setPhone(data.user?.phoneNumber || "");
        }
      });
      const addressRef = databaseRef(database, "usersAddress/" + authUser.uid);
      onValue(addressRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          setAddress(data.userAddress || "");
        }
      });
    }
  }, [authUser]);
  return (
    <>
      <div className={styles.info}>
        <div className="flex flex-col items-center justify-center border border-gray-scale-gray-100 rounded-lg p-8">
          {authUser?.photoURL ? (
            <img
              src={authUser.photoURL}
              alt="Profile"
              className="rounded-full w-32 h-32 object-cover"
            />
          ) : (
            <picture>
              <source srcSet="../img/foto.avif" type="image/avif" />
              <source srcSet="../img/foto.webp" type="image/webp" />
              <img
                src="../img/foto.jpg"
                alt="Profile"
                className="rounded-full w-32 h-32 object-cover"
              />
            </picture>
          )}
          {authUser?.displayName && (
            <h5 className="text-xl font-medium mt-2">{authUser.displayName}</h5>
          )}
          <p className="text-gray-scale-gray-500">Customer</p>
        </div>
        <div className="border border-gray-scale-gray-100 rounded-lg p-8">
          <h4 className="text-gray-scale-gray-400 uppercase font-medium">
            Billing Address
          </h4>
          {authUser?.displayName && (
            <h5 className="mt-4 text-lg font-medium">{authUser.displayName}</h5>
          )}
          <address className="flex flex-col gap-y-2 not-italic">
            {address && (
              <span className="text-gray-scale-gray-600">{address}</span>
            )}
            {authUser && <span className="text-base">{authUser.email}</span>}
            {phone && (
              <span className="text-gray-scale-gray-600 text-base">
                {phone}
              </span>
            )}
          </address>
        </div>
      </div>
    </>
  );
};

export default DashboardInfo;
