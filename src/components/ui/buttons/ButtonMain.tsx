import { FC } from "react";
interface Props {
  value: string;
  fun: () => void;
}
const ButtonMain: FC<Props> = ({ value, fun }) => {
  return (
    <>
      <button
        onClick={fun}
        type="button"
        className="py-4 bg-branding-success rounded-56 w-full  flex justify-center font-semibold text-white hover:text-branding-warning transition-all"
      >
        <span>{value}</span>
      </button>
    </>
  );
};

export default ButtonMain;
