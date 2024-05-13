import { FC } from "react";
import ProductCard from "@/components/ProductCard/ProductCard";
import styles from "./Categories.module.scss";
import IProduct from "@/interface/IProduct";
import PaginationPage from "@/components/pagination/PaginationPage";

interface iProps {
  products: IProduct[];
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  setFilter: (page: string | number) => void;
  searchParams: URLSearchParams;
}
const ProductsCategories: FC<iProps> = ({
  products,
  setCurrentPage,
  currentPage,
  setFilter,
  searchParams,
}) => {
  const itemsPerPage = 1; // Количество элементов на странице
  // Вычисляем общее количество страниц
  const totalPages = Math.ceil(products.length / itemsPerPage);
  // Получаем подмассив элементов для текущей страницы
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = products.slice(startIndex, endIndex);

  return (
    <>
      <div>
        <div className={styles.productCategories}>
          {currentProducts.map((product) => {
            return <ProductCard product={product} key={product.name} />;
          })}
        </div>
        {products.length > itemsPerPage && (
          <PaginationPage
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            setFilter={setFilter}
            searchParams={searchParams}
            totalPages={totalPages}
          />
        )}
      </div>
    </>
  );
};
export default ProductsCategories;
