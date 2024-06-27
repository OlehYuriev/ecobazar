import { FC, useEffect } from "react";
import styles from "./DoubleScrollBar.module.scss";

interface IProps {
  min: number;
  max: number;
  step: number;
  forid: string;
  inputFrom: number;
  setInputFrom: React.Dispatch<React.SetStateAction<number>>;
  inputTo: number;
  setInputTo: React.Dispatch<React.SetStateAction<number>>;
}

const RangeComponent: FC<IProps> = ({
  min,
  max,
  step,
  forid,
  inputFrom,
  setInputFrom,
  inputTo,
  setInputTo,
}) => {
  useEffect(() => {
    const display = document.getElementById(forid);
    const slider = document.getElementById(`slider-${forid}`);
    if (display && slider) {
      // Проверяем наличие элементов перед использованием
      if (inputFrom > inputTo) {
        slider.style.right = `${
          100 - ((inputFrom - min) / (max - min)) * 100
        }%`;
        slider.style.left = `${((inputTo - min) / (max - min)) * 100}%`;
      } else {
        slider.style.right = `${100 - ((inputTo - min) / (max - min)) * 100}%`;
        slider.style.left = `${((inputFrom - min) / (max - min)) * 100}%`;
      }
    }
  }, [inputFrom, inputTo, min, max, step, forid]);
  useEffect(() => {
    // Обновляем inputTo при изменении max
    if (inputTo > max) {
      setInputTo(max);
    }
  }, [max, inputTo, setInputTo]);
  useEffect(() => {
    // Устанавливаем inputTo в максимальное значение при изменении max
    setInputTo(max);
  }, [max, setInputTo]);
  return (
    <>
      <div>
        <div className={styles.rangeSlider}>
          <span className={styles.rangeSelected} id={`slider-${forid}`}></span>
          {/* Добавлен id для span */}
        </div>
        <div className={styles.rangeInput}>
          <input
            type="range"
            onChange={(e) => setInputFrom(parseFloat(e.target.value))}
            min={min}
            max={max}
            step={step}
            value={inputFrom}
          />
          <input
            type="range"
            onChange={(e) => setInputTo(parseFloat(e.target.value))}
            min={min}
            max={max}
            step={step}
            value={inputTo}
          />
        </div>
      </div>
      <div id={forid} className="mt-4">
        <span>
          Price:
          <span className="ml-1 font-semibold">
            {inputFrom} - {inputTo}
          </span>
        </span>
      </div>
    </>
  );
};

export default RangeComponent;
