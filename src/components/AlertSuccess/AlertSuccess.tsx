import { FC, useEffect } from "react";
import styles from "./AlertSuccess.module.scss";

interface AlertProps {
  message: string;
  showAlert: boolean;
  setShowAlert: React.Dispatch<React.SetStateAction<boolean>>;
}
const AlertSuccess: FC<AlertProps> = ({ message, showAlert, setShowAlert }) => {
  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [setShowAlert, showAlert]);

  return (
    <>
      <div
        className={`${styles.alert} ${showAlert ? styles.alert__active : ""}`}
      >
        <h5>{message}</h5>
      </div>
    </>
  );
};

export default AlertSuccess;
