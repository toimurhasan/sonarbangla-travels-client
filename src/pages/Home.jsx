import React from "react";
import BannerSwiper from "../components/BannerSwiper";
import Overview from "../components/Overview";
import TourismTabs from "../components/TourismTabs";
import TouristStorySection from "../components/TouristStorySection";
import WhyTravelWithUs from "../components/WhyTravelWithUs";
import PopularDestinations from "../components/PopularDestinations";
import TestimonialSection from "../components/TestimonialSection";
import NewsletterSection from "../components/NewsletterSection";

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
      <NewsletterSection />
    </div>
  );
};

export default Home;
