import { FC, useEffect, useRef, useState } from "react";
import styles from "./Header.module.scss";
import { IoSearch } from "react-icons/io5";
import { products } from "@/date/products";
import IProduct from "@/interface/IProduct";
import { useDispatch } from "react-redux";
import { searchProduct } from "@/store/search/searchSlice";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const HeaderSearch: FC = () => {
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState<IProduct[]>([]);
  const suggestionsRef = useRef<HTMLUListElement>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setValue(inputValue);
    // Фильтруем продукты по введенному тексту
    const filteredProducts = products.filter((product) =>
      product.name.toLowerCase().includes(inputValue.toLowerCase())
    );
    // Ограничиваем количество предложений до 5
    setSuggestions(filteredProducts.slice(0, 5));
  };

  const handleSuggestionClick = (name: string) => {
    setValue(name); // Устанавливаем выбранное значение в поле ввода
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
    dispatch(searchProduct(value));
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
                  {product.name}
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
