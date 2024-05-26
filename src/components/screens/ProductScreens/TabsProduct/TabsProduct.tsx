import { FC, useEffect, useRef, useState } from "react";
import styles from "./TabsProduct.module.scss";
import IProduct from "@/interface/IProduct";

interface IProps {
  product: IProduct;
}

const TabsProduct: FC<IProps> = ({ product }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [sliderStyle, setSliderStyle] = useState({ width: 0, left: 0 });
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    if (tabRefs.current[activeTab]) {
      const activeTabElement = tabRefs.current[activeTab];
      setTimeout(() => {
        const { offsetWidth, offsetLeft } = activeTabElement;
        setSliderStyle({ width: offsetWidth, left: offsetLeft });
      }, 50);
    }
  }, [activeTab]);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
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
              <p className="text-gray-scale-gray-500">
                {" "}
                Sed commodo aliquam dui ac porta. Fusce ipsum felis, imperdiet
                at posuere ac, viverra at mauris. Maecenas tincidunt ligula a
                sem vestibulum pharetra. Maecenas auctor tortor lacus, nec
                laoreet nisi porttitor vel. Etiam tincidunt metus vel dui
                interdum sollicitudin. Mauris sem ante, vestibulum nec orci
                vitae, aliquam mollis lacus. Sed et condimentum arcu, id
                molestie tellus. Nulla facilisi. Nam scelerisque vitae justo a
                convallis. Morbi urna ipsum, placerat quis commodo quis, egestas
                elementum leo. Donec convallis mollis enim. Aliquam id mi quam.
                Phasellus nec fringilla elit. Nulla mauris tellus, feugiat quis
                pharetra sed, gravida ac dui. Sed iaculis, metus faucibus
                elementum tincidunt, turpis mi viverra velit, pellentesque
                tristique neque mi eget nulla. Proin luctus elementum neque et
                pharetra.{" "}
              </p>
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
          {activeTab === 2 && <div className={styles.slide}>Content 3.1</div>}
          <div className={styles.tabImg}>
            <picture>
              <source srcSet="../img/man.avif" type="image/avif" />
              <source srcSet="../img/man.webp" type="image/webp" />
              <img src="../img/man.jpg" alt="man" className="w-full" />
            </picture>
          </div>
        </div>
      </div>
    </>
  );
};

export default TabsProduct;
