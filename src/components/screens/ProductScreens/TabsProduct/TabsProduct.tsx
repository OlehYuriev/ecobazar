import { FC, useEffect, useRef, useState } from "react";
import styles from "./TabsProduct.module.scss";
import IProduct from "@/interface/IProduct";
import useAuth from "@/hooks/useAuth";
import { push, ref as databaseRef, set } from "firebase/database";
import { database } from "@/firebase";
import TextareaComponent from "@/components/ui/textarea/TextareaComponent";
import ButtonMain from "@/components/ui/buttons/ButtonMain";
import CommentsComponent from "@/components/CommentComponent/CommentsComponent";
import { useTranslation } from "react-i18next";

interface IProps {
  product: IProduct;
}

const TabsProduct: FC<IProps> = ({ product }) => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState(0);
  const [sliderStyle, setSliderStyle] = useState<{
    width: number;
    left: number;
  }>({ width: 0, left: 0 });
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    if (tabRefs.current[activeTab]) {
      const activeTabElement = tabRefs.current[activeTab] as HTMLButtonElement;
      setTimeout(() => {
        const { offsetWidth, offsetLeft } = activeTabElement;
        setSliderStyle({ width: offsetWidth, left: offsetLeft });
      }, 50);
    }
  }, [activeTab]);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };
  const [comment, setComment] = useState("");

  const user = useAuth();
  const handleAddComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (user && comment.trim()) {
      const commentRef = push(
        databaseRef(database, "comments/" + product.name)
      );
      await set(commentRef, {
        userId: user.uid,
        username: user.displayName,
        photoUrl: user.photoURL,
        comment: comment,
        timestamp: Date.now(),
      });
      setComment("");
    }
  };

  return (
    <>
      <div className="mt-11">
        <div className={styles.tabList}>
          {[
            t("Descriptions"),
            t("account.AdditionalInfo"),
            t("CustomerFeedback"),
          ].map((tab, index) => (
            <button
              key={tab}
              className={activeTab === index ? styles.active : ""}
              onClick={() => handleTabClick(index)}
              ref={(el) => (tabRefs.current[index] = el)}
            >
              {tab}
            </button>
          ))}
          <div
            className={styles.slider}
            style={{ width: sliderStyle.width, left: sliderStyle.left }}
          ></div>
        </div>
        <div className={styles.slider__line}></div>
        <div className={styles.tabContent}>
          {activeTab === 0 && (
            <div className={styles.slide}>
              <p className="text-gray-scale-gray-500">
                {" "}
                {t(`products.${product.name}.description`)}
              </p>
            </div>
          )}
          {activeTab === 1 && (
            <div className={styles.slide}>
              <div className={styles.list}>
                <span>{t("Weight")}</span>
                <span className="text-gray-scale-gray-600">03</span>
                <span>{t("Category")}</span>
                <span className="text-gray-scale-gray-600">
                  {t(`products.${product.name}.category`)}
                </span>
                <span>{t("StockStatus")}</span>
                <span className="text-gray-scale-gray-600">
                  {t("Available")}
                </span>
              </div>
            </div>
          )}
          {activeTab === 2 && (
            <div className={styles.slide}>
              <CommentsComponent product={product} />
            </div>
          )}

          <div className={styles.tabForm}>
            {user?.displayName ? (
              <form action="" onSubmit={handleAddComment}>
                <TextareaComponent
                  value={comment}
                  setValue={setComment}
                  placeholder={t("AddComment")}
                  label={t("AddComment")}
                />
                <div className="mt-5 inline-flex">
                  <ButtonMain
                    value={t("SendComment")}
                    type="submit"
                    disabled={!comment}
                  />
                </div>
              </form>
            ) : (
              <h3>{t("LogInEnterName")}</h3>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default TabsProduct;
