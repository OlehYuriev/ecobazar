import { FC } from "react";
import ButtonQuantity from "../ui/buttons/ButtonQuantity";
import IProduct from "@/interface/IProduct";
import { useDispatch } from "react-redux";
import { addQuantity, subtractQuantity } from "@/store/basket/basketSlice";

interface IProps {
  product: IProduct;
}
const QuantityBasket: FC<IProps> = ({ product }) => {
  const dispatch = useDispatch();
  return (
    <>
      <div className="flex flex-col  mt-2 ">
        <div className="flex gap-x-2.5 items-center">
          <ButtonQuantity
            value="+"
            fun={() => dispatch(addQuantity(product))}
          />
          <span>
            <span className="font-semibold">{product.quantity}</span>
          </span>
          <ButtonQuantity
            value="-"
            fun={() => dispatch(subtractQuantity(product))}
          />
        </div>
      </div>
    </>
  );
};

export default QuantityBasket;
