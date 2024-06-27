import { FC, useEffect, useMemo, useRef, useState } from "react";
import styles from "./Header.module.scss";
import { IoSearch } from "react-icons/io5";
import { products } from "@/date/products";
import IProduct from "@/interface/IProduct";
import { useDispatch } from "react-redux";
import { searchProduct } from "@/store/search/searchSlice";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import enTranslations from "../../../public/locales/en/translation.json";
import uaTranslations from "../../../public/locales/ua/translation.json";

type TranslationsType = {
  [key: string]: {
    name: string;
    description: string;
    category: string;
  };
};
const HeaderSearch: FC = () => {
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState<IProduct[]>([]);
  const suggestionsRef = useRef<HTMLUListElement>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();

  const translations: TranslationsType =
    i18n.language === "ua" ? uaTranslations.products : enTranslations.products;

  // Фильтруем продукты по введенному тексту на основе текущего языка
  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        const translatedProductName = t(`products.${product.name}.name`);
        return (
          product.name.toLowerCase().includes(value.toLowerCase()) ||
          translatedProductName.toLowerCase().includes(value.toLowerCase()) ||
          uaTranslations.products[
            product.name as keyof typeof uaTranslations.products
          ]?.name
            .toLowerCase()
            .includes(value.toLowerCase())
        );
      })
      .slice(0, 5);
  }, [value, t]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value.toLowerCase();
    setValue(inputValue);

    setSuggestions(filteredProducts);
  };
  const handleSuggestionClick = (name: string) => {
    const translatedName = translations[name]?.name || name; // Получаем переведенное имя, если доступно, иначе используем оригинальное
    setValue(translatedName); // Устанавливаем переведенное имя в поле ввода
    setSuggestions([]); // Скрываем список предложений
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event: MouseEvent) => {
    // Проверяем, был ли клик совершен вне области списка
    if (
      suggestionsRef.current &&
      !suggestionsRef.current.contains(event.target as Node)
    ) {
      setSuggestions([]); // Скрываем список предложений
    }
  };

  function searchGoods(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    navigate("/categories");
    dispatch(searchProduct(translations[value]?.name || value));
  }
  return (
    <>
      <form action="" className={styles.form} onSubmit={searchGoods}>
        <label htmlFor="" className="relative">
          <IoSearch className={styles.iconSearch} fontSize="1rem" />
          <input
            className="border-y-2 border-l-2 border-gray-scale-gray-100 rounded-l-lg py-3 pl-10 "
            placeholder={t("header.Search")}
            type="text"
            value={value}
            onChange={handleChange}
          />
          {suggestions.length > 0 && (
            <ul
              className="absolute bg-gray-scale-gray-100 w-full py-1.5"
              ref={suggestionsRef}
            >
              {suggestions.map((product, index) => (
                <li
                  key={index}
                  onClick={() => handleSuggestionClick(product.name)}
                  className="mt-1 hover:bg-gray-scale-gray-400 px-1.5"
                >
                  {t(`products.${product.name}.name`)}
                </li>
              ))}
            </ul>
          )}
        </label>
        <button className="bg-branding-success px-3.5 rounded-r-md text-white hover:opacity-80 transition-all">
          {t("header.Search")}
        </button>
      </form>
    </>
  );
};

export default HeaderSearch;
