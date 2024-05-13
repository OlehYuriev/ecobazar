import { FC } from "react";
import styles from "./BannersHome.module.scss";
import LinkComponent from "@/components/ui/link/LinkComponent";
const BannersHome: FC = () => {
  return (
    <>
      <section>
        <div className="container">
          <div className={styles.HomeScreen}>
            <div className={styles.fresh}>
              <div className={styles.fresh__content}>
                <h1 className={styles.fresh__title}>
                  Fresh & Healthy Organic Food
                </h1>
                <div className="pl-3 border-l-2 border-branding-success-bright mt-8">
                  <p className={styles.fresh__text}>
                    Sale up to
                    <span className="bg-branding-warning px-3 py-1 rounded-md ml-2">
                      30% OFF
                    </span>
                  </p>
                  <p className={styles.fresh__sale}>
                    Free shipping on all your order.
                  </p>
                </div>
                <LinkComponent
                  name="Shop now"
                  classes="mt-7 py-4 px-10 bg-white rounded-56 "
                />
              </div>
            </div>
            <div className="gap-y-5 flex flex-col flex-1">
              <div className={styles.sale}>
                <div className={styles.sale__content}>
                  <h4 className=" uppercase font-medium">Summer Sale</h4>
                  <h2 className="font-semibold text-3xl">75% OFF</h2>
                  <p className="text-gray-scale-gray-600">
                    Only Fruit & Vegetable
                  </p>
                  <LinkComponent name="Shop now" classes="mt-3" />
                </div>
              </div>
              <div className={styles.deal}>
                <div className={styles.deal__content}>
                  <h4 className=" uppercase font-medium">Best Deal</h4>
                  <h2 className="font-semibold text-3xl text-balance">
                    Special Products Deal of the Month
                  </h2>

                  <LinkComponent name="Shop now" classes="mt-3" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BannersHome;
