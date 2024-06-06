import { FC, useEffect, useState } from "react";
import FilterCategories from "./FilterCategories";
import ProductsCategories from "./ProductsCategories";
import styles from "./Categories.module.scss";
import { products } from "@/date/products";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import useParamsPage from "@/hooks/useParamsPage";
import useExchangeRate from "@/hooks/useExchangeRate";
import { handleUsdAmountChange } from "@/utils";
import { calculateDiscountedPriceOneProduct } from "@/utils";
const CategoriesScreens: FC = () => {
  const { exchangeRate, currency } = useExchangeRate();
  const [radioOption, setRadioOption] = useState("All");
  const [inputFrom, setInputFrom] = useState(0);
  const [inputTo, setInputTo] = useState(1000);
  const { searchParams, setPage, setSearchParams } = useParamsPage();

  const [currentPage, setCurrentPage] = useState(1);
  const searchProduct = useSelector(
    (state: RootState) => state.search.productsSearch
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
    const price = calculateDiscountedPriceOneProduct(product);
    const priceCurrency = parseFloat(
      handleUsdAmountChange(price, exchangeRate, currency)
    );
    if (radioOption !== "All" && product.category !== radioOption) {
      return false;
    }
    if (!product.name.toLowerCase().includes(searchProduct.toLowerCase())) {
      return false;
    }
    // Фильтрация по цене
    if (priceCurrency < inputFrom || priceCurrency > inputTo) {
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
