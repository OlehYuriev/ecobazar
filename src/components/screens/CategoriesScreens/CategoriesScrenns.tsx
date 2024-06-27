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
import { useTranslation } from "react-i18next";

import uaTranslations from "../../../../public/locales/ua/translation.json";

type UaTranslationsType = {
  products: {
    [key: string]: {
      name: string;
      description: string;
      category: string;
    };
  };
};

const CategoriesScreens: FC = () => {
  const { t } = useTranslation();
  const { exchangeRate, currency } = useExchangeRate();
  const [radioOption, setRadioOption] = useState("All");
  const [inputFrom, setInputFrom] = useState(0);
  const [inputTo, setInputTo] = useState(500);
  const { searchParams, setPage, setSearchParams } = useParamsPage();
  const [currentPage, setCurrentPage] = useState(1);
  const searchProduct = useSelector(
    (state: RootState) => state.search.productsSearch
  );

  useEffect(() => {
    let newMax = 500;
    if (currency === "UAH") {
      newMax = 5000;
    }
    if (inputTo > newMax) {
      setInputTo(newMax);
    }
  }, [currency, inputTo]);

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

    // Получаем переведенное имя продукта
    const translatedProductName = t(`products.${product.name}.name`);

    // Фильтрация по выбранной категории
    if (radioOption !== "All" && product.category !== radioOption) {
      return false;
    }

    // Фильтрация по тексту поиска
    if (
      !product.name.toLowerCase().includes(searchProduct.toLowerCase()) &&
      !translatedProductName
        .toLowerCase()
        .includes(searchProduct.toLowerCase()) &&
      !(uaTranslations.products as UaTranslationsType["products"])[
        product.name
      ]?.name
        .toLowerCase()
        .includes(searchProduct.toLowerCase())
    ) {
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
