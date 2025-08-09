import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./customSwiper.css";

interface BannerImageType {
  id: number;
  storeId: number;
  imageUrl: string;
  imageType: string;
}

const CommonSwiper = ({ slideImages }: { slideImages: BannerImageType[] }) => {
  return (
    <section className="swiper-wrap">
      <Swiper
        className="swiper"
        modules={[Navigation, Pagination]}
        slidesPerView={1}
        pagination
      >
        {slideImages?.map((slideImage) => {
          return (
            <SwiperSlide className="swiper-slide">
              <img src={slideImage.imageUrl} alt="학과 주점 대표 이미지" />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
};

export default CommonSwiper;
