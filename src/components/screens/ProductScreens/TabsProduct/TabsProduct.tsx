import { FC, useEffect, useRef, useState } from "react";
import styles from "./TabsProduct.module.scss";
import IProduct from "@/interface/IProduct";
import useAuth from "@/hooks/useAuth";
import { push, ref as databaseRef, set } from "firebase/database";
import { database } from "@/firebase";
import TextareaComponent from "@/components/ui/textarea/TextareaComponent";
import ButtonMain from "@/components/ui/buttons/ButtonMain";

import CommentsComponent from "@/components/CommentComponent/CommentsComponent";

interface IProps {
  product: IProduct;
}

const TabsProduct: FC<IProps> = ({ product }) => {
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
          {["Descriptions", "Additional Information", "Customer Feedback"].map(
            (tab, index) => (
              <button
                key={tab}
                className={activeTab === index ? styles.active : ""}
                onClick={() => handleTabClick(index)}
                ref={(el) => (tabRefs.current[index] = el)}
              >
                {tab}
              </button>
            )
          )}
          <div
            className={styles.slider}
            style={{ width: sliderStyle.width, left: sliderStyle.left }}
          ></div>
        </div>
        <div className={styles.slider__line}></div>
        <div className={styles.tabContent}>
          {activeTab === 0 && (
            <div className={styles.slide}>
              <p className="text-gray-scale-gray-500"></p>
            </div>
          )}
          {activeTab === 1 && (
            <div className={styles.slide}>
              <div className={styles.list}>
                <span>Weight:</span>
                <span className="text-gray-scale-gray-600">03</span>
                <span>Color:</span>
                <span className="text-gray-scale-gray-600">Green</span>
                <span>Category:</span>
                <span className="text-gray-scale-gray-600">
                  {product.category}
                </span>
                <span>Stock Status:</span>
                <span className="text-gray-scale-gray-600">Available</span>
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
                  placeholder="Add a comment"
                  label="Add a comment"
                />
                <div className="max-w-48 mt-5">
                  <ButtonMain
                    value="Send comment"
                    type="submit"
                    disabled={!comment}
                  />
                </div>
              </form>
            ) : (
              <h3>Log in and enter your name</h3>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default TabsProduct;
