import { FC, useCallback, useEffect, useState } from "react";
import FilterCategories from "./FilterCategories";
import ProductsCategories from "./ProductsCategories";
import styles from "./Categories.module.scss";
import { products } from "@/date/products";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const CategoriesScreens: FC = () => {
  const [radioOption, setRadioOption] = useState("All");
  const [inputFrom, setInputFrom] = useState(0);
  const [inputTo, setInputTo] = useState(100);
  const [searchParams, setSearchParams] = useSearchParams();

  const [currentPage, setCurrentPage] = useState(1);
  const searchProduct = useSelector(
    (state: RootState) => state.search.productsSearch
  );
  const setPage = useCallback(
    (page: string | number) => {
      searchParams.set("page", String(page));
      setSearchParams(searchParams);
    },
    [searchParams, setSearchParams]
  );
  const setFilter = (filter: string) => {
    searchParams.set("category", filter);
    setSearchParams(searchParams);
    setPage(1);
    setCurrentPage(1);
  };

  useEffect(() => {
    const categoryParam = searchParams.get("category");
    if (categoryParam) {
      setRadioOption(categoryParam);
    } else {
      setRadioOption("All");
    }
  }, [searchParams]);

  const filteredProducts = products.filter((product) => {
    if (radioOption !== "All" && product.category !== radioOption) {
      return false;
    }
    if (!product.name.toLowerCase().includes(searchProduct.toLowerCase())) {
      return false;
    }
    // Фильтрация по цене
    if (product.price < inputFrom || product.price > inputTo) {
      return false;
    }

    return true;
  });

  return (
    <>
      <section>
        <div className="container">
          <div className={styles.categories}>
            <FilterCategories
              radioOption={radioOption}
              setRadioOption={setRadioOption}
              inputFrom={inputFrom}
              setInputFrom={setInputFrom}
              inputTo={inputTo}
              setInputTo={setInputTo}
              setFilter={setFilter}
            />
            <ProductsCategories
              products={filteredProducts}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              setFilter={setPage}
              searchParams={searchParams}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default CategoriesScreens;
