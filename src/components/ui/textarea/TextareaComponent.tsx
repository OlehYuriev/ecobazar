import { joinLabel } from "@/utils";
import { FC } from "react";

interface IProps {
  value: string;
  setValue: (newValue: string) => void;
  placeholder: string;
  label?: string;
}

const TextareaComponent: FC<IProps> = ({
  value,
  setValue,
  placeholder,
  label,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value);
    console.log(value);
  };

  const htmlForValue = joinLabel(label!);
  return (
    <>
      <label htmlFor={htmlForValue} className="flex flex-col w-full">
        {label && <span className=" font-semibold">{label}</span>}
        <textarea
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          name="textarea"
          id={htmlForValue}
          className="border border-gray-scale-gray-100 rounded-md px-4 py-3.5 resize-none mt-2"
        ></textarea>
      </label>
    </>
  );
};

export default TextareaComponent;
