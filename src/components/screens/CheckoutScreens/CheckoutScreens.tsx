import { FC, useEffect, useState } from "react";
import CheckoutForm from "./CheckoutForm";
import OrderSummery from "./OrderSummery";
import { IInfoSend } from "@/interface/IInfo";
import { ref as databaseRef, onValue, push } from "firebase/database";
import useAuth from "@/hooks/useAuth";
import { database } from "@/firebase";
import useUserInfo from "@/hooks/useUserInfo";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import IProductOrder from "@/interface/IProductOrder";
import {
  calculateDiscountedPrice,
  calculateDiscountedPriceOneProduct,
  formatDate,
  getTotalPrice,
} from "@/utils";
import AlertSuccess from "@/components/AlertSuccess/AlertSuccess";
import { useDispatch } from "react-redux";
import { clearBasket } from "@/store/basket/basketSlice";

const CheckoutScreens: FC = () => {
  const authUser = useAuth();
  const dispatch = useDispatch();
  const [info, setInfo] = useState<IInfoSend>({
    firstName: "",
    lastName: "",
    companyName: "",
    streetAddress: "",
    email: "",
    phone: "",
    additionalInfo: "",
  });
  const basket = useSelector((state: RootState) => state.basket.productsBasket);
  const TotalPrice = getTotalPrice(basket);
  const [radioOption, setRadioOption] = useState("Cash on Delivery");
  const [ordersArray, setOrdersArray] = useState<number>(0);
  const [error, setError] = useState<string>("");
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (authUser) {
      const productsRef = databaseRef(database, "products/" + authUser.uid);
      onValue(productsRef, (snapshot) => {
        const data = snapshot.val();
        console.log(data);
        if (data) {
          const ordersArray = Object.values(data).length;
          setOrdersArray(ordersArray);
        } else {
          setOrdersArray(0);
        }
      });
    }
  }, [authUser]);

  async function addProduct(product: IProductOrder) {
    if (authUser && product.order.basketWithSubtotal.length) {
      const productsRef = databaseRef(database, "products/" + authUser.uid);
      try {
        await push(productsRef, product);
        setShowAlert(true);
        dispatch(clearBasket());
        setError("");
      } catch (error) {
        setError("Something went wrong");
        console.error("Error adding product:", error);
      }
    } else if (!authUser && product.order.basketWithSubtotal.length) {
      setShowAlert(true);
      setError("");
      dispatch(clearBasket());
    } else {
      setError("There are no products in the cart");
    }
  }

  async function placeOrder(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const basketWithSubtotal = basket.map((product) => ({
      ...product,
      price: calculateDiscountedPriceOneProduct(product),
      subtotal: calculateDiscountedPrice(product),
    }));

    const FullInfoProduct: IProductOrder = {
      idOrder: ordersArray + 1,
      order: {
        basketWithSubtotal,
      },
      ...info,
      payment: radioOption,
      totalPrice: TotalPrice,
      dateProduct: formatDate(),
    };

    await addProduct(FullInfoProduct);
  }

  useEffect(() => {
    if (authUser) {
      // Чтение данных из базы данных
      const userRef = databaseRef(database, "usersAddress/" + authUser.uid);
      onValue(userRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          setInfo((prevInfo) => ({
            ...prevInfo,
            streetAddress: data.userAddress || "",
          }));
        }
      });
    }
  }, [authUser]);
  useUserInfo<IInfoSend>(setInfo);
  return (
    <>
      <section>
        <div className="container">
          <div className="flex mt-8 gap-x-6">
            <CheckoutForm info={info} setInfo={setInfo} />
            <OrderSummery
              info={info}
              basket={basket}
              TotalPrice={TotalPrice}
              placeOrder={placeOrder}
              radioOption={radioOption}
              setRadioOption={setRadioOption}
              error={error}
            />
          </div>
        </div>
      </section>
      <AlertSuccess
        showAlert={showAlert}
        setShowAlert={setShowAlert}
        message="Thanks for your order"
      />
    </>
  );
};

export default CheckoutScreens;
