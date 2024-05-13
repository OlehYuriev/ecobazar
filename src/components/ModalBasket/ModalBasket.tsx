import { FC } from "react";
import styles from "./ModalBasket.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import ModalItemBasket from "./ModalItemBasket";
import { getTotalPrice } from "@/utils";
import ButtonMain from "../ui/buttons/ButtonMain";

interface IProps {
  isModal: boolean;
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
}
const ModalBasket: FC<IProps> = ({ isModal, setIsModal }) => {
  const basket = useSelector((state: RootState) => state.basket.productsBasket);
  const navigate = useNavigate();
  const TotalPrice = getTotalPrice(basket);
  function closeBasketModal() {
    setIsModal(false);
  }

  function navigateCheckout() {
    closeBasketModal();
    navigate("/checkout");
  }

  return (
    <>
      <section
        className={`${styles.basket} ${isModal ? styles.basket_active : ""}`}
      >
        <div className="bg-white p-10 flex flex-col justify-between ">
          <div>
            <div className="flex justify-between items-center ">
              <h5 className="font-medium text-xl">
                Shopping Card ({basket.length})
              </h5>
              <span className="cursor-pointer ml-24" onClick={closeBasketModal}>
                <IoMdClose fontSize="1.63rem" />
              </span>
            </div>
            <div className={styles.items}>
              <ModalItemBasket basket={basket} />
            </div>
          </div>
          <div>
            <div className="flex justify-between items-center py-6">
              <span>{basket.length} Product</span>
              <span className="font-semibold">${TotalPrice.toFixed(2)}</span>
            </div>

            <ButtonMain value="Checkout" fun={navigateCheckout} />
          </div>
        </div>
      </section>
    </>
  );
};

export default ModalBasket;
