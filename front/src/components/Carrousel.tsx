import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { Link } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const slides = [
  { id: 1, image: '/talking.jpeg' },
  { id: 2, image: '/talking.jpeg' },
  { id: 3, image: '/talking.jpeg' },
];

export default function CTAcarousel() {
  return (
    <div className="relative mx-auto h-auto max-h-[400px] overflow-hidden">
      <Swiper
        modules={[Navigation]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        className="relative"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="flex items-center justify-between bg-gray-100 rounded-lg shadow-lg h-[400px]">
              <div className="w-1/2 p-4 lg:px-20">
                <h2 className="text-2xl font-bold text-primary_400 lg:text-3xl">
                  Descubre qué necesitas para mejorar tu <span className='text-secondary_600'>comunicación y liderazgo</span>
                </h2>
                <p className="text-lg text-gray-600 mt-2">¡Haz tu diagnóstico ahora!</p>
                <Link to="/diagnostic" className="inline-block mt-4 px-6 py-3 text-white bg-secondary_600 rounded-lg shadow">
                  Diagnóstico
                </Link>
              </div>
              <div className="w-1/2">
                <img src={slide.image} alt="Slide" className="w-full h-full object-cover rounded-lg" />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      {/* <button className="swiper-button-prev absolute left-0 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-gray-800/50 text-white rounded-full">
        <FaChevronLeft size={24} />
      </button>
      <button className="swiper-button-next absolute right-0 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-gray-800/50 text-white rounded-full">
        <FaChevronRight size={24} />
      </button> */}
    </div>
  );
}
