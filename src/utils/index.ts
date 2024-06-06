import IProduct from "@/interface/IProduct";

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
  const unitPrice = product.price;
  const quantity = product.quantity;

  let finalPrice = unitPrice * quantity;

  if (product.sale) {
    const discountAmount = finalPrice * (product.sale / 100);
    finalPrice -= discountAmount;
  }

  return parseFloat(finalPrice.toFixed(2));
};
export const calculateDiscountedPriceOneProduct = (product: IProduct) => {
  const unitPrice = product.price;

  let finalPrice = unitPrice;

  if (product.sale) {
    const discountAmount = finalPrice * (product.sale / 100);
    finalPrice -= discountAmount;
  }

  return parseFloat(finalPrice.toFixed(2));
};

export const getTotalPrice = (basket: IProduct[]) => {
  return basket.reduce(
    (total: number, product: IProduct) =>
      total + calculateDiscountedPrice(product),
    0
  );
};

export function getRandomSaleProducts(
  maxItems: number,
  products: IProduct[]
): IProduct[] {
  const saleProducts = products.filter(
    (product) => product.sale && product.sale > 0
  );
  const shuffledProducts = saleProducts.sort(() => 0.5 - Math.random());
  return shuffledProducts.slice(0, maxItems);
}

export function formatDate() {
  return new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export const timeAgo = (timestamp: number): string => {
  const now = Date.now(); // Получаем текущие время в миллисекундах
  const diffInSeconds = Math.floor((now - timestamp) / 1000); // Преобразуем timestamp в секунды

  const intervals = [
    { label: "year", seconds: 31536000 },
    { label: "month", seconds: 2592000 },
    { label: "week", seconds: 604800 },
    { label: "day", seconds: 86400 },
    { label: "hour", seconds: 3600 },
    { label: "minute", seconds: 60 },
    { label: "second", seconds: 1 },
  ];

  for (const interval of intervals) {
    const count = Math.floor(diffInSeconds / interval.seconds);
    if (count > 0) {
      return `${count} ${interval.label}${count !== 1 ? "s" : ""} ago`;
    }
  }

  return "just now";
};

export const handleUsdAmountChange = (
  price: number,
  exchangeRate: number | null,
  currency: string
) => {
  let finalPrice = price;
  if (exchangeRate && currency === "UAH") {
    finalPrice = price * exchangeRate;
  }
  return finalPrice.toFixed(2);
};

export function currencyChange(currency: string) {
  let currencySymbol = "$";
  if (currency === "UAH") {
    currencySymbol = "₴";
  }
  return currencySymbol;
}
