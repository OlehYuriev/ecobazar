import { FC } from "react";
import RadioButton from "@/components/ui/input/RadioButton";

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
  const AccordionCategories = [
    {
      id: 1,
      radio: (
        <RadioButton
          radioOption={radioOption}
          setRadioOption={setRadioOption}
          value="All"
          setFilter={setFilter}
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
