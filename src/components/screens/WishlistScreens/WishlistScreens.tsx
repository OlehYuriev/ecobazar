import AccountTable from "@/components/table/AccountTable";
import { RootState } from "@/store/store";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const WishlistScreens = () => {
  const { t } = useTranslation();
  const wishlist = useSelector(
    (state: RootState) => state.wishlist.productsWishlist
  );
  return (
    <>
      <section>
        <h1 className="font-semibold text-center text-3xl">
          {t("MyWishlist")}
        </h1>
        {wishlist.length ? (
          <div className="overflow-auto mt-8">
            <AccountTable
              type="wishlist"
              tableArray={wishlist}
              columns={[
                t("Product"),
                t("categoriesPage.Price"),
                "Stock Status",
                " ",
              ]}
            />
          </div>
        ) : (
          <h3 className=" font-semibold text-center mt-9 text-3xl text-branding-warning">
            {t("WishListEmpty")}
          </h3>
        )}
      </section>
    </>
  );
};
export default WishlistScreens;
