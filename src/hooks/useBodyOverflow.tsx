import { useEffect } from "react";

const useBodyOverflow = (isActive: boolean) => {
  useEffect(() => {
    if (isActive) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflowY = "auto";
      document.body.style.overflowX = "hidden";
    }

    return () => {
      document.body.style.overflowY = "auto";
      document.body.style.overflowX = "hidden";
    };
  }, [isActive]);
};

export default useBodyOverflow;
