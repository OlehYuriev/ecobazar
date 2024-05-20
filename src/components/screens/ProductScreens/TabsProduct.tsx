import { FC, useEffect, useRef, useState } from "react";
import styles from "./ProductScreens.module.scss";

const TabsProduct: FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [sliderStyle, setSliderStyle] = useState({ width: 0, left: 0 });
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    if (tabRefs.current[activeTab]) {
      const activeTabElement = tabRefs.current[activeTab];
      const { offsetWidth, offsetLeft } = activeTabElement!;
      setSliderStyle({ width: offsetWidth, left: offsetLeft });
    }
  }, [activeTab]);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };
  return (
    <>
      <div>
        <div className="tab-list">
          {["Descriptions", "Additional Information", "Customer Feedback"].map(
            (tab, index) => (
              <button
                key={index}
                className={activeTab === index ? "active" : ""}
                onClick={() => handleTabClick(index)}
                ref={(el) => (tabRefs.current[index] = el)}
              >
                {tab}
              </button>
            )
          )}
          <div
            className="slider"
            style={{ width: sliderStyle.width, left: sliderStyle.left }}
          ></div>
        </div>

        <div className="tab-content">
          {activeTab === 0 && (
            <div className="slides">
              <div className="slide">Content 1.1</div>
            </div>
          )}
          {activeTab === 1 && (
            <div className="slides">
              <div className="slide">Content 2.1</div>
            </div>
          )}
          {activeTab === 2 && (
            <div className="slides">
              <div className="slide">Content 3.1</div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default TabsProduct;
