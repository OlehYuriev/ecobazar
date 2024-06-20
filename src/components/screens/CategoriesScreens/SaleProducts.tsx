import { FC, useEffect, useState } from "react";
import { products } from "@/date/products";
import IProduct from "@/interface/IProduct";
import ProductItem from "@/components/ProductItem/ProductItem";
import { getRandomSaleProducts } from "@/utils";
import { useTranslation } from "react-i18next";

const SaleProducts: FC = () => {
  const { t } = useTranslation();
  const [randomSaleProducts, setRandomSaleProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    const saleProducts = products.filter(
      (product) => product.sale && product.sale > 0
    );
    const randomProducts = getRandomSaleProducts(3, saleProducts);
    setRandomSaleProducts(randomProducts);
  }, []);

  return (
    <>
      <div>
        <h3 className="text-xl font-medium">
          {t("categoriesPage.SaleProducts")}
        </h3>
        <div className="flex flex-col gap-y-4 mt-3">
          {randomSaleProducts.map((item) => (
            <ProductItem key={item.name} product={item} />
          ))}
        </div>
      </div>
    </>
  );
};

export default SaleProducts;
