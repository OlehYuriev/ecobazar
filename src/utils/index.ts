import IProduct from "@/interface/IProduct";

export const getTotalPrice = (basket: IProduct[]) => {
  return basket.reduce(
    (total: number, product: IProduct) => total + product.price,
    0
  );
};

export function joinLabel(label: string) {
  if (label) {
    const wordsArray = label.split(" ");
    const formattedWords = wordsArray.map((word, index) => {
      if (index === 0) {
        // Первое слово оставляем без изменений
        return word;
      } else {
        // Остальные слова преобразуем
        return word.charAt(0).toUpperCase() + word.slice(1);
      }
    });
    const formattedString = formattedWords.join("");
    return formattedString;
  }
}

export const calculateDiscountedPrice = (product: IProduct) => {
  if (product.sale) {
    const discountAmount = product.price * (product.sale / 100);
    const discountedPrice = product.price - discountAmount;
    return discountedPrice.toFixed(2);
  }
};
