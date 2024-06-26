import { FC, useState } from "react";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import "./SliderComponent.scss";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/effect-fade";
import { Navigation, Thumbs, EffectFade } from "swiper/modules";
import IProduct from "@/interface/IProduct";

interface IProps {
  product: IProduct;
}

const SliderComponent: FC<IProps> = ({ product }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [swiperInstance, setSwiperInstance] = useState<SwiperClass | null>(
    null
  );

  const handleSlideChange = (swiper: SwiperClass) => {
    setCurrentIndex(swiper.realIndex);
  };
  const goToNextSlide = () => {
    if (swiperInstance !== null) {
      swiperInstance.slideNext(); // Метод для перехода к следующему слайду
    }
  };

  const goToPrevSlide = () => {
    if (swiperInstance !== null) {
      swiperInstance.slidePrev(); // Метод для перехода к предыдущему слайду
    }
  };

  return (
    <>
      <div className="swiper-container">
        <Swiper
          spaceBetween={10}
          thumbs={thumbsSwiper ? { swiper: thumbsSwiper } : undefined}
          modules={[Navigation, Thumbs, EffectFade]}
          className="my-swiper2"
          direction="vertical"
          effect="fade"
          onSlideChange={handleSlideChange}
          onSwiper={(swiper) => setSwiperInstance(swiper)}
        >
          {product.img.map((item) => (
            <SwiperSlide key={item}>
              <div className="bg-white w-full h-full">
                <img src={`../img/products/${item}.png`} alt={product.name} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="py-8 relative">
          <Swiper
            onSwiper={setThumbsSwiper}
            spaceBetween={10}
            slidesPerView={product.img.length >= 4 ? 4 : product.img.length}
            watchSlidesProgress={true}
            modules={[Thumbs]}
            className="my-swiper"
            direction="vertical"
          >
            {product.img.map((item) => (
              <SwiperSlide key={item}>
                <img src={`../img/products/${item}.png`} alt={product.name} />
              </SwiperSlide>
            ))}
          </Swiper>

          <div
            className={`swiper-button-prev text-gray-scale-gray-400 ${
              currentIndex == 0 ? "swiper-button-disabled" : ""
            }`}
            onClick={goToPrevSlide}
          >
            <IoIosArrowUp />
          </div>
          <div
            className={`swiper-button-next text-gray-scale-gray-400 ${
              currentIndex === product.img.length - 1
                ? "swiper-button-disabled"
                : ""
            }`}
            onClick={goToNextSlide}
          >
            <IoIosArrowDown />
          </div>
        </div>
      </div>
    </>
  );
};

export default SliderComponent;
