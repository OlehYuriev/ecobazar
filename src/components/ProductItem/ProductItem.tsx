import { FC } from "react";
import IProduct from "@/interface/IProduct";
import styles from "./ProductItem.module.scss";
import { calculateDiscountedPrice } from "@/utils";
import { Link } from "react-router-dom";
interface IProps {
  product: IProduct;
}
const ProductItem: FC<IProps> = ({ product }) => {
  return (
    <>
      <Link to={`/categories/${product.name}`}>
        <div className={styles.item}>
          <img src="../img/apple.png" alt="apple" className=" max-w-28" />
          <div>
            <h5 className="text-gray-scale-gray-700">{product.name}</h5>
            <span className=" text-base font-medium mr-2">
              ${calculateDiscountedPrice(product)}
            </span>
            <span className="text-base line-through text-gray-scale-gray-400">
              ${product.price.toFixed(2)}
            </span>
          </div>
        </div>
      </Link>
    </>
  );
};

export default ProductItem;
