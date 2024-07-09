import { ButtonHTMLAttributes, FC } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
  fun?: (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  type?: "button" | "submit" | "reset";
}
const ButtonMain: FC<Props> = ({ value, fun, type = "button", ...rest }) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (fun) {
      fun(e);
    }
  };
  return (
    <>
      <button
        onClick={handleClick}
        {...rest}
        type={type}
        className="py-4 px-10 bg-branding-success rounded-56   flex justify-center font-semibold text-white hover:text-branding-warning transition-all  disabled:bg-opacity-50 disabled:hover:text-white"
      >
        <span>{value}</span>
      </button>
    </>
  );
};

export default ButtonMain;
