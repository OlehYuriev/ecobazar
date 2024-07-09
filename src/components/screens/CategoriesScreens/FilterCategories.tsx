import AccordionComponent from "@/components/accordion/AccordionComponent";
import { FC, useEffect, useState } from "react";
import ButtonsCategories from "./ButtonsCategories";
import RangeComponent from "@/components/ui/range/RangeComponent";
import styles from "./Categories.module.scss";
import DiscountCategories from "./DiscountCategories";
import SaleProducts from "./SaleProducts";
import { useTranslation } from "react-i18next";
import useExchangeRate from "@/hooks/useExchangeRate";

interface IProps {
  radioOption: string;
  setRadioOption: React.Dispatch<React.SetStateAction<string>>;
  inputFrom: number;
  setInputFrom: React.Dispatch<React.SetStateAction<number>>;
  inputTo: number;
  setInputTo: React.Dispatch<React.SetStateAction<number>>;
  setFilter: (filter: string) => void;
}

const FilterCategories: FC<IProps> = ({
  radioOption,
  setRadioOption,
  inputFrom,
  setInputFrom,
  inputTo,
  setInputTo,
  setFilter,
}) => {
  const { t } = useTranslation();
  const { currency } = useExchangeRate();
  const [max, setMax] = useState(500);
  useEffect(() => {
    let newMax = 500;
    if (currency === "UAH") {
      newMax = 5000;
    }
    setMax(newMax);

    // Проверка текущего значения inputTo, чтобы не прыгал ползунок
    if (inputTo > newMax) {
      setInputTo(newMax);
    }
  }, [currency, inputTo, setInputTo]);

  return (
    <>
      <div className="flex flex-col gap-y-5">
        <div className={styles.filters}>
          <AccordionComponent title={t("categoriesPage.AllCategories")}>
            <ButtonsCategories
              radioOption={radioOption}
              setRadioOption={setRadioOption}
              setFilter={setFilter}
            />
          </AccordionComponent>
          <AccordionComponent title={t("categoriesPage.Price")}>
            <RangeComponent
              min={0}
              max={max}
              step={1}
              forid="display1"
              inputFrom={inputFrom}
              setInputFrom={setInputFrom}
              inputTo={inputTo}
              setInputTo={setInputTo}
            />
          </AccordionComponent>
        </div>
        <div className="md:flex md:flex-col hidden">
          <DiscountCategories />
          <SaleProducts />
        </div>
      </div>
    </>
  );
};

export default FilterCategories;
