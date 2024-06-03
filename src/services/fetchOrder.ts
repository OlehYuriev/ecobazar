import IProductOrder from "@/interface/IProductOrder";
import { LoaderFunctionArgs } from "react-router-dom";
import { ref as databaseRef, onValue } from "firebase/database";
import { auth, database } from "@/firebase";
import { onAuthStateChanged } from "firebase/auth";

export async function fetchOrder({
  params,
}: LoaderFunctionArgs): Promise<IProductOrder | null> {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const productsRef = databaseRef(database, "products/" + user.uid);
        onValue(
          productsRef,
          (snapshot) => {
            const data = snapshot.val();

            if (data) {
              const ordersArray: IProductOrder[] = Object.values(data);

              const orderItem = ordersArray.find(
                (order) => order.idOrder.toString() === params.idOrder
              );

              resolve(orderItem || null);
            } else {
              resolve(null);
            }
          },
          (error) => {
            reject(error);
          }
        );
      } else {
        resolve(null);
      }
    });
  });
}
