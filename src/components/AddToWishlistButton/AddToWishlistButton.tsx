import useProductExists from "@/hooks/useProductExists";
import IProduct from "@/interface/IProduct";
import { RootState } from "@/store/store";
import { addProductWIshlist } from "@/store/wishlist/wishlistSlice";
import { FC } from "react";
import { FaRegHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import styles from "./AddToWishlistButton.module.scss";

interface IProps {
  product: IProduct;
}

const AddToWishlistButton: FC<IProps> = ({ product }) => {
  const dispatch = useDispatch();
  const wishlist = useSelector(
    (state: RootState) => state.wishlist.productsWishlist
  );
  const wishlistExists = useProductExists(wishlist, product);
  function addWishlist(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    dispatch(addProductWIshlist(product));
  }

  return (
    <>
      <button
        type="button"
        className={`${styles.button} ${styles.button_heart} ${
          wishlistExists ? " bg-red-500 text-white" : "bg-gray-scale-gray-50"
        }`}
        onClick={(e) => addWishlist(e)}
      >
        <FaRegHeart fontSize="1.35rem" />
      </button>{" "}
    </>
  );
};
export default AddToWishlistButton;
