import { FC, ReactNode, useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { MdKeyboardArrowUp } from "react-icons/md";
import styles from "./AccordionComponent.module.scss";

interface IProps {
  title: string;
  children: ReactNode;
}

const AccordionComponent: FC<IProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(true);
  function open() {
    setIsOpen((prev) => !prev);
  }
  return (
    <>
      <div className={`${isOpen ? styles.open : ""} ${styles.accordion} `}>
        <div className="flex justify-between items-center w-full">
          <h3 className="text-xl font-medium">{title}</h3>
          <button type="button" onClick={open} className="text-3xl">
            {isOpen ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
          </button>
        </div>
        <div className="mt-4">{children}</div>
      </div>
    </>
  );
};

export default AccordionComponent;
