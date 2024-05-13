import AccordionComponent from "@/accordion/AccordionComponent";
import { FC } from "react";
import ButtonsCategories from "./ButtonsCategories";
import RangeComponent from "@/components/ui/range/RangeComponent";
import styles from "./Categories.module.scss";
import DiscountCategories from "./DiscountCategories";
import SaleProducts from "./SaleProducts";

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
  return (
    <>
      <div className="flex flex-col gap-y-5">
        <div className={styles.filters}>
          <AccordionComponent title="All Categories">
            <ButtonsCategories
              radioOption={radioOption}
              setRadioOption={setRadioOption}
              setFilter={setFilter}
            />
          </AccordionComponent>
          <AccordionComponent title="Price">
            <RangeComponent
              min={0}
              max={100}
              step={1}
              forid="display1"
              inputFrom={inputFrom}
              setInputFrom={setInputFrom}
              inputTo={inputTo}
              setInputTo={setInputTo}
            />
          </AccordionComponent>
        </div>
        <DiscountCategories />
        <SaleProducts />
      </div>
    </>
  );
};

export default FilterCategories;
