import { FC, useEffect } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";
import ButtonQuantity from "../ui/buttons/ButtonQuantity";
import { useDispatch } from "react-redux";
import {
  addQuantity,
  subtractQuantity,
  removeProduct,
} from "@/store/basket/basketSlice";
import IProduct from "@/interface/IProduct";
import { calculateDiscountedPrice } from "@/utils";
interface IProps {
  basket: IProduct[];
}
const ModalItemBasket: FC<IProps> = ({ basket }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    console.log(basket);
  }, [basket]);

  return (
    <>
      {basket.map((item) => (
        <div key={item.name} className="flex justify-between items-center">
          <div className="flex items-center">
            <img src="../img/apple.png" alt="apple" className="max-w-32" />
            <div className="flex flex-col w-52">
              <h5>
                {item.name}
                <span className=" font-semibold ml-2">
                  ${calculateDiscountedPrice(item)}
                </span>
              </h5>

              <div className="flex flex-col  mt-2">
                <div className="flex gap-x-2.5 items-center">
                  <ButtonQuantity
                    value="+"
                    fun={() => dispatch(addQuantity(item))}
                  />
                  <span>
                    quantity:
                    <span className="font-semibold">{item.quantity}</span>
                  </span>
                  <ButtonQuantity
                    value="-"
                    fun={() => dispatch(subtractQuantity(item))}
                  />
                </div>
              </div>
            </div>
          </div>

          <button
            className="text-gray-scale-gray-600"
            onClick={() => dispatch(removeProduct(item))}
          >
            <IoCloseCircleOutline fontSize="1.5rem" />
          </button>
        </div>
      ))}
    </>
  );
};

export default ModalItemBasket;
