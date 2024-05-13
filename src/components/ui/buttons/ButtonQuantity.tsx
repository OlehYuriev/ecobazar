import { FC } from "react";
interface IProps {
  value: string;
  fun: () => void;
}

const ButtonQuantity: FC<IProps> = ({ value, fun }) => {
  return (
    <>
      <button
        type="button"
        onClick={fun}
        className="w-9 h-9 bg-gray-scale-gray-50 rounded-full"
      >
        {value}
      </button>
    </>
  );
};

export default ButtonQuantity;
