import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const slides = [
  {
    id: 1,
    image: "https://i.ibb.co/KJ9vpVs/one.webp",
    title: "Explore Bangladesh",
    subtitle: "From the hills of Bandarban to the beaches of Cox's Bazar",
  },
  {
    id: 2,
    image: "https://i.ibb.co/fdmxkP4s/two.webp",
    title: "Adventure Awaits",
    subtitle: "Experience culture, nature, and unforgettable memories",
  },
  {
    id: 3,
    image: "https://i.ibb.co/ZpK2QpYq/three.jpg",
    title: "Discover Hidden Gems",
    subtitle: "Cruise through the rivers and explore the Sundarbans",
  },
];

const BannerSwiper = () => {
  return (
    <div className="relative">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="h-[60vh]"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-[60vh] min-h-[300px]">
              <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-white px-4 text-center">
                <h2 className="text-3xl md:text-5xl font-bold mb-2">{slide.title}</h2>
                <p className="text-lg md:text-2xl">{slide.subtitle}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BannerSwiper;
