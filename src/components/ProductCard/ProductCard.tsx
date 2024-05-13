import { FC, useEffect, useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { RiShoppingBagLine } from "react-icons/ri";
import styles from "./ProductCard.module.scss";
import IProduct from "@/interface/IProduct";
import { useSelector, useDispatch } from "react-redux";
import { addProduct } from "@/store/basket/basketSlice";
import { RootState } from "@/store/store";
import { calculateDiscountedPrice } from "@/utils";
interface IProps {
  product: IProduct;
}
const ProductCard: FC<IProps> = ({ product }) => {
  const basket = useSelector((state: RootState) => state.basket.productsBasket);
  const dispatch = useDispatch();
  const [isBasket, setIsBasket] = useState(false);
  useEffect(() => {
    const productExistsInBasket = basket.some(
      (item) => item.name === product.name
    );
    setIsBasket(productExistsInBasket);
  }, [basket, product, isBasket]);

  return (
    <>
      <div className={styles.item}>
        <div className="relative">
          <img src="../img/apple.png" alt="apple" className="w-full" />
          <button type="button" className={styles.button}>
            <FaRegHeart fontSize="1.35rem" />
          </button>
          {product.sale && (
            <span className="absolute top-4 left-4 bg-branding-error font-medium text-white rounded py-1 px-2">
              Sale {product.sale}%
            </span>
          )}
        </div>
        <div className="flex p-3 items-center justify-between">
          <div>
            <h4 className="text-gray-scale-gray-700">{product.name}</h4>
            {product.sale ? (
              <span className=" text-base font-medium">
                <span>${calculateDiscountedPrice(product)}</span>
                <span className="text-gray-scale-gray-400 font-normal line-through ml-1">
                  ${product.price.toFixed(2)}
                </span>
              </span>
            ) : (
              <span className=" text-base font-medium">
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>

          <button
            className={`p-2.5 rounded-full ${
              isBasket
                ? "bg-branding-success text-white"
                : "bg-gray-scale-gray-50"
            }`}
            type="button"
            onClick={() => dispatch(addProduct(product))}
          >
            <RiShoppingBagLine fontSize="1.35rem" />
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
