import { FC } from "react";
import RadioButton from "@/components/ui/input/RadioButton";
import { useTranslation } from "react-i18next";

interface IProps {
  radioOption: string;
  setRadioOption: React.Dispatch<React.SetStateAction<string>>;
  setFilter: (filter: string) => void;
}

const ButtonsCategories: FC<IProps> = ({
  radioOption,
  setRadioOption,
  setFilter,
}) => {
  const { t } = useTranslation();
  const AccordionCategories = [
    {
      id: 1,
      radio: (
        <RadioButton
          radioOption={radioOption}
          setRadioOption={setRadioOption}
          value="All"
          setFilter={setFilter}
          label={t("categories.All")}
        />
      ),
    },
    {
      id: 2,
      radio: (
        <RadioButton
          radioOption={radioOption}
          setRadioOption={setRadioOption}
          value="Fresh Fruit"
          setFilter={setFilter}
          label={t("categories.FreshFruit")}
        />
      ),
    },
    {
      id: 3,
      radio: (
        <RadioButton
          radioOption={radioOption}
          setRadioOption={setRadioOption}
          value="Vegetables"
          setFilter={setFilter}
          label={t("categories.FreshVegetables")}
        />
      ),
    },
  ];
  return (
    <>
      <ol className="flex flex-col gap-y-4">
        {AccordionCategories.map((category) => (
          <li key={category.id}>{category.radio}</li>
        ))}
      </ol>
    </>
  );
};
export default ButtonsCategories;
