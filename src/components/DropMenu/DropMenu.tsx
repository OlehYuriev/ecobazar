import { FC, useEffect, useRef, useState } from "react";
import styles from "./DropMenu.module.scss";
import { IoIosArrowDown } from "react-icons/io";

interface IProps {
  value: string;
  buttons: string[];
  changeValue: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const DropMenu: FC<IProps> = ({ value, buttons, changeValue }) => {
  const [activeMenu, setActiveMenu] = useState(false);
  const menuRef = useRef<HTMLButtonElement>(null);
  function toggleDropMenu() {
    setActiveMenu((prev) => !prev);
  }
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActiveMenu(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);
  return (
    <>
      <button
        ref={menuRef}
        className={`${styles.dropMenu} ${activeMenu ? styles.active : ""}`}
        onClick={toggleDropMenu}
      >
        <div className="flex items-center gap-x-1 cursor-pointer">
          <span>{value}</span>{" "}
          <span className={styles.dropMenu__icon}>
            <IoIosArrowDown />
          </span>
        </div>
        <div className={styles.dropMenu__list}>
          {buttons.map((item) => (
            <span onClick={changeValue} key={item}>
              {item}
            </span>
          ))}
        </div>
      </button>
    </>
  );
};

export default DropMenu;
