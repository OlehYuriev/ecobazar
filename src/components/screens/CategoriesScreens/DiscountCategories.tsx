import { FC } from "react";

const DiscountCategories: FC = () => {
  return (
    <>
      <div className="rounded-lg relative">
        <picture>
          <source srcSet="../img/discount.avif" type="image/avif" />
          <source srcSet="../img/discount.webp" type="image/webp" />
          <img
            src="../img/discount.png"
            alt="discount"
            className="rounded-xl w-full"
          />
        </picture>
        <div className="text-center absolute top-5 inset-x-1/4">
          <p className="text-2xl">
            <span className="text-3xl font-semibold text-branding-warning mr-2">
              79%
            </span>
            Discount
          </p>
          <p>on your first order</p>
        </div>
      </div>
    </>
  );
};

export default DiscountCategories;
