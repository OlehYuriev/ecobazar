import { FC } from "react";
import styles from "./DropMenu.module.scss";
import { IoIosArrowDown } from "react-icons/io";

interface IProps {
  value: string;
  buttons: string[];
  changeValue: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const DropMenu: FC<IProps> = ({ value, buttons, changeValue }) => {
  return (
    <>
      <div className={styles.dropMenu}>
        <div className="flex items-center gap-x-1 cursor-pointer">
          <span>{value}</span>{" "}
          <span className={styles.dropMenu__icon}>
            <IoIosArrowDown />
          </span>
        </div>
        <div className={styles.dropMenu__list}>
          {buttons.map((item) => (
            <button onClick={changeValue} key={item} type="button">
              {item}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default DropMenu;
