import { FC, useEffect, useState } from "react";
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
  const [swiperInstance, setSwiperInstance] = useState<SwiperClass | null>(
    null
  );
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const handleSlideChange = (swiper: SwiperClass) => {
    setCurrentIndex(swiper.realIndex);
  };

  const goToNextSlide = () => {
    if (swiperInstance !== null) {
      swiperInstance.slideNext();
    }
  };

  const goToPrevSlide = () => {
    if (swiperInstance !== null) {
      swiperInstance.slidePrev();
    }
  };

  useEffect(() => {
    const slides = document.querySelectorAll(".swiper-thumbs .swiper-slide");
    slides.forEach((slide, index) => {
      if (slide instanceof HTMLElement) {
        if (index === currentIndex) {
          slide.classList.add("swiper-slide-thumb-active");
        } else {
          slide.classList.remove("swiper-slide-thumb-active");
        }
      }
    });
    if (thumbsSwiper) {
      thumbsSwiper.slideTo(currentIndex);
      thumbsSwiper.update(); // Обновляем Swiper после перехода к новому слайду
    }
  }, [currentIndex, thumbsSwiper]);

  const handleThumbClick = (index: number) => {
    setCurrentIndex(index); // Обновляем текущий индекс слайда
    if (thumbsSwiper && swiperInstance !== null) {
      thumbsSwiper.slideTo(index); // Переключаем thumbs Swiper на выбранный индекс
      swiperInstance.slideTo(index); // Переключаем основной Swiper на выбранный индекс
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
              <div className="bg-white w-full h-full swiper-slide">
                <img src={`/img/products/${item}.png`} alt={product.name} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="py-8 relative">
          <Swiper
            onSwiper={(swiper) => {
              setThumbsSwiper(swiper);
            }}
            spaceBetween={10}
            slidesPerView={product.img.length >= 4 ? 4 : product.img.length}
            watchSlidesProgress={true}
            modules={[Thumbs]}
            className="my-swiper swiper-thumbs"
            direction="vertical"
          >
            {product.img.map((item, index) => (
              <SwiperSlide
                key={item}
                className={`cursor-pointer ${
                  index === currentIndex ? "swiper-slide-thumb-active" : ""
                }`}
                onClick={() => handleThumbClick(index)}
              >
                <img src={`/img/products/${item}.png`} alt={product.name} />
              </SwiperSlide>
            ))}
          </Swiper>

          <div
            className={`swiper-button-prev text-gray-scale-gray-400 ${
              currentIndex === 0 ? "swiper-button-disabled" : ""
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
