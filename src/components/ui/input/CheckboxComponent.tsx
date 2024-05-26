import { FC } from "react";
import styles from "./input.module.scss";
interface IProps {
  isChecked: boolean;
  setIsChecked: React.Dispatch<React.SetStateAction<boolean>>;
  label: string;
}

const CheckboxComponent: FC<IProps> = ({ isChecked, setIsChecked, label }) => {
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  return (
    <>
      <label htmlFor="checkbox" className={styles.checkbox}>
        <input
          id="checkbox"
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
          className={styles.checkbox__input}
        />
        <span className={styles.checkbox__label}>{label}</span>
      </label>
    </>
  );
};

export default CheckboxComponent;
