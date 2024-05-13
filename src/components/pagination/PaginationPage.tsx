import { FC, useEffect } from "react";
import styles from "./PaginationPage.module.scss";
import { MdArrowBackIosNew } from "react-icons/md";
import { MdArrowForwardIos } from "react-icons/md";

interface iProps {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  setFilter: (page: string | number) => void;
  searchParams: URLSearchParams;
  totalPages: number;
}

const PaginationPage: FC<iProps> = ({
  currentPage,
  setCurrentPage,
  setFilter,
  searchParams,
  totalPages,
}) => {
  // Генерируем массив номеров страниц для отображения в пагинации
  const pageNumbers: number[] = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  // Определяем диапазон страниц, который нужно отобразить в пагинации
  const getPageRange = () => {
    const delta = 2;
    const range = [];
    const result: number[] = [];

    range.push(1);

    for (let i = currentPage - delta; i <= currentPage + delta; i++) {
      if (i >= 2 && i < totalPages) {
        range.push(i);
      }
    }

    range.push(totalPages);

    for (let i = 0; i < range.length; i++) {
      if (result.length && range[i] - result[result.length - 1] === 2) {
        result.push(range[i] - 1);
      } else if (result.length && range[i] - result[result.length - 1] !== 1) {
        result.push(-1); // -1 будет означать троеточие
      }
      result.push(range[i]);
    }

    return result;
  };

  // Обработчики событий для изменения текущей страницы
  const nextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    setFilter(currentPage + 1);
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    setFilter(currentPage - 1);
  };

  const goToPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    setFilter(pageNumber);
  };

  useEffect(() => {
    const pageParam = searchParams.get("page");
    if (pageParam) {
      const parsedPage = parseInt(pageParam);
      setCurrentPage(parsedPage);
    }
  }, [searchParams, setCurrentPage]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
      setFilter(1);
    }
  }, [currentPage, setCurrentPage, setFilter, totalPages]);

  return (
    <>
      <div className={styles.pagination}>
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className={styles.pagination__button}
        >
          <MdArrowBackIosNew />
        </button>

        {getPageRange().map((pageNumber, index) => (
          <span
            key={index}
            onClick={() => {
              if (pageNumber !== -1) {
                goToPage(pageNumber);
              }
            }}
            className={` cursor-pointer  ${
              pageNumber === currentPage
                ? styles.pagination__active
                : pageNumber === -1
                ? "cursor-default"
                : undefined
            }`}
          >
            <span></span>
            {pageNumber === -1 ? "..." : pageNumber}
          </span>
        ))}

        <button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          className={styles.pagination__button}
        >
          <MdArrowForwardIos />
        </button>
      </div>
    </>
  );
};
export default PaginationPage;
