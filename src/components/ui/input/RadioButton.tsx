import { FC } from "react";
import styles from "./input.module.scss";

interface IProps {
  radioOption: string;
  setRadioOption: React.Dispatch<React.SetStateAction<string>>;
  value: string;
  setFilter?: (filter: string) => void;
  label: string;
}

const RadioButton: FC<IProps> = ({
  radioOption,
  setRadioOption,
  value,
  setFilter,
  label,
}) => {
  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRadioOption(event.target.value);
    if (setFilter) {
      setFilter(event.target.value);
    }
  };
  return (
    <>
      <label className={styles.customRadioLabel}>
        <input
          type="radio"
          value={value}
          checked={radioOption === value}
          onChange={handleOptionChange}
          className={styles.customRadioInput}
        />
        <span className={styles.customRadioSpan}></span>
        <span className="ml-1.5"> {label}</span>
      </label>
    </>
  );
};

export default RadioButton;
