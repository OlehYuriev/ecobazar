import { FC, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  return (
    <>
      <div className="swiper-container">
        <Swiper
          spaceBetween={10}
          navigation={{
            prevEl: ".swiper-button-prev",
            nextEl: ".swiper-button-next",
          }}
          thumbs={thumbsSwiper ? { swiper: thumbsSwiper } : undefined}
          modules={[Navigation, Thumbs, EffectFade]}
          className="my-swiper2"
          direction="vertical"
          effect="fade"
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
            slidesPerView={4}
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

          <div className="swiper-button-prev text-gray-scale-gray-400">
            <IoIosArrowUp />
          </div>
          <div className="swiper-button-next text-gray-scale-gray-400">
            <IoIosArrowDown />
          </div>
        </div>
      </div>
    </>
  );
};

export default SliderComponent;
