// import Spline from '@splinetool/react-spline/next';
import HeroSection from "@/components/ui/homePage/heroSection/HeroSection";
import Specialties from "@/components/ui/homePage/specialties/Specialties";
import TopRatedDoctors from "@/components/ui/homePage/topRatedDoctors/TopRatedDoctors";
import WhyUs from "@/components/ui/homePage/whyUs/WhyUs";
import { Button } from "@mui/material";

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <Specialties />
      <TopRatedDoctors />
      <WhyUs />
      <Button>Insert</Button>
    </div>
  );
};

export default HomePage;
