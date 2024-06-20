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
          value="Fresh Vegetables"
          setFilter={setFilter}
          label={t("categories.FreshVegetables")}
        />
      ),
    },
    {
      id: 4,
      radio: (
        <RadioButton
          radioOption={radioOption}
          setRadioOption={setRadioOption}
          value="Meat & Fish"
          setFilter={setFilter}
          label={t("categories.MeatFish")}
        />
      ),
    },
    {
      id: 5,
      radio: (
        <RadioButton
          radioOption={radioOption}
          setRadioOption={setRadioOption}
          value="Snacks"
          setFilter={setFilter}
          label={t("categories.Snacks")}
        />
      ),
    },
    {
      id: 6,
      radio: (
        <RadioButton
          radioOption={radioOption}
          setRadioOption={setRadioOption}
          value="Beverages"
          setFilter={setFilter}
          label={t("categories.Beverages")}
        />
      ),
    },
    {
      id: 7,
      radio: (
        <RadioButton
          radioOption={radioOption}
          setRadioOption={setRadioOption}
          value="Beauty & Health"
          setFilter={setFilter}
          label={t("categories.BeautyHealth")}
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
