import React from "react";
import BannerSwiper from "../components/BannerSwiper";
import Overview from "../components/Overview";
import TourismTabs from "../components/TourismTabs";
import TouristStorySection from "../components/TouristStorySection";
import WhyTravelWithUs from "../components/WhyTravelWithUs";
import PopularDestinations from "../components/PopularDestinations";

const Home = () => {
  return (
    <div>
      <BannerSwiper></BannerSwiper>
      <Overview></Overview>
      <TourismTabs></TourismTabs>
      <TouristStorySection></TouristStorySection>
      <PopularDestinations />
      <WhyTravelWithUs />
    </div>
  );
};

export default Home;
