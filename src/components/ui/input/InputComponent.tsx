import { FC, InputHTMLAttributes, useState } from "react";
import { joinLabel } from "@/utils";
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";
import styles from "./input.module.scss";

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  value: string;
  setValue: (newValue: string) => void;
  placeholder: string;
  type?: string;
  label?: string;
  typePassword?: boolean;
}
const InputComponent: FC<IProps> = ({
  value,
  setValue,
  placeholder,
  type,
  label,
  typePassword,
  ...rest
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setValue(newValue);
  };
  const [isActiveEye, setIsActiveEye] = useState<boolean>(false);
  const [typeInput, setTypeInput] = useState("password");
  const htmlForValue = joinLabel(label!);

  function toggleEye() {
    setIsActiveEye((prev) => !prev);
    if (!isActiveEye && setTypeInput) {
      setTypeInput("text");
    } else if (isActiveEye && setTypeInput) {
      setTypeInput("password");
    }
  }
  return (
    <>
      <label htmlFor={htmlForValue} className="flex flex-col w-full relative">
        {label && <span className="mb-2">{label}</span>}
        <input
          {...rest}
          id={htmlForValue}
          type={typePassword ? typeInput : type || "text"}
          value={value}
          onChange={handleChange}
          className="border border-gray-scale-gray-100 rounded-md px-4 py-3.5"
          placeholder={placeholder}
        />

        {typePassword &&
          (!isActiveEye ? (
            <IoEyeOutline className={styles.eye} onClick={() => toggleEye()} />
          ) : (
            <IoEyeOffOutline
              className={styles.eye}
              onClick={() => toggleEye()}
            />
          ))}
      </label>
    </>
  );
};

export default InputComponent;
