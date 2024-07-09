import { FC, ReactNode, useEffect, useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { MdKeyboardArrowUp } from "react-icons/md";
import styles from "./AccordionComponent.module.scss";

interface IProps {
  title: string;
  children: ReactNode;
}

const AccordionComponent: FC<IProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(true);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
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
