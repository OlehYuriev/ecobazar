import { FC } from "react";
import { joinLabel } from "@/utils";

interface IProps {
  value: string;
  setValue: (newValue: string) => void;
  placeholder: string;
  type?: string;
  label?: string;
}
const InputComponent: FC<IProps> = ({
  value,
  setValue,
  placeholder,
  type,
  label,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setValue(newValue);
  };

  const htmlForValue = joinLabel(label!);

  return (
    <>
      <label htmlFor={htmlForValue} className="flex flex-col w-full">
        {label && <span className="mb-2">{label}</span>}
        <input
          id={htmlForValue}
          type={type || "text"}
          value={value}
          onChange={handleChange}
          className="border border-gray-scale-gray-100 rounded-md px-4 py-3.5"
          placeholder={placeholder}
        />
      </label>
    </>
  );
};

export default InputComponent;
