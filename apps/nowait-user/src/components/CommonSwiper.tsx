import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./customSwiper.css";
import type { BannerImages } from "../types/wait/store";
import DefaultImage from "../assets/default-image-lg.png";

const CommonSwiper = ({ slideImages }: { slideImages: BannerImages[] }) => {
  console.log(slideImages,"1111111111111111111111111")
  return (
    <section className="swiper-wrap">
      <Swiper
        className="swiper"
        modules={[Navigation, Pagination]}
        slidesPerView={1}
        pagination
      >
        {slideImages && slideImages.length > 0 ? (
          slideImages?.splice(0,3).map((slideImage) => {
            return (
              <SwiperSlide className="swiper-slide">
                <img
                  src={slideImage.imageUrl || DefaultImage}
                  alt="학과 주점 대표 이미지"
                />
              </SwiperSlide>
            );
          })
        ) : (
          <SwiperSlide className="swiper-slide">
            <img src={DefaultImage} alt="학과 주점 기본 이미지" />
          </SwiperSlide>
        )}
      </Swiper>
    </section>
  );
};

export default CommonSwiper;
