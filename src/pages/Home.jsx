import React from "react";
import BannerSwiper from "../components/BannerSwiper";
import Overview from "../components/Overview";
import TourismTabs from "../components/TourismTabs";
import TouristStorySection from "../components/TouristStorySection";
import WhyTravelWithUs from "../components/WhyTravelWithUs";
import PopularDestinations from "../components/PopularDestinations";
import TestimonialSection from "../components/TestimonialSection";

const Home = () => {
  return (
    <div>
      <BannerSwiper />
      <Overview />
      <TourismTabs />
      <TouristStorySection />
      <PopularDestinations />
      <TestimonialSection />
      <WhyTravelWithUs />
    </div>
  );
};

export default Home;
