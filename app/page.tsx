import AmenitiesSection from "./components/AmenitiesSection";
import HeroSection from "./components/banner";
import BuildingRulesSection from "./components/building-rules";
import FooterSection from "./components/footer";
import Header from "./components/header";
import RoomGridSection from "./components/listing";

export default function Home() {
  return (
    <main className="">
      <Header />
      <HeroSection />
      <RoomGridSection />
      <AmenitiesSection />
      {/* <NoticeBoardSection /> */}
      <BuildingRulesSection />
      <FooterSection />
    </main>
  );
}
