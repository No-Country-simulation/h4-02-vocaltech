import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const MyCarousel = () => (
  <Swiper slidesPerView={1} pagination={{ clickable: true }}>
    <SwiperSlide>Slide 1</SwiperSlide>
    <SwiperSlide>Slide 2</SwiperSlide>
  </Swiper>
);

export default MyCarousel;