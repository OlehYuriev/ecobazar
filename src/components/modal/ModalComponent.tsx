import { FC, useRef } from "react";
import styles from "./ModalComponent.module.scss";

interface IProps {
  isModal: boolean;
  children: React.ReactNode;
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalComponent: FC<IProps> = ({ isModal, children, setIsModal }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && modalRef.current === event.target) {
      setIsModal(false);
    }
  };
  return (
    <>
      <div
        className={`${styles.modal} ${isModal ? styles.modal_active : ""}`}
        onClick={handleClickOutside}
        ref={modalRef}
      >
        {children}
      </div>
    </>
  );
};

export default ModalComponent;
