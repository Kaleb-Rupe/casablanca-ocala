import PropertyCard from "@/components/property/PropertyCard";
import { mockProperty } from "@/lib/services/mockData";
import HeroSection from "@/components/home/HeroSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import WhatsNearby from "@/components/home/WhatsNearby";
import HouseRules from "@/components/home/HouseRules";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <div className="w-full bg-[#F5F4F1]">
        <div className="mx-5">
          <HeroSection />

          <section
            id="properties"
            className="my-8"
            style={{
              scrollMarginTop: "calc(var(--header-offset, 0px) + 24px)",
            }}
          >
            <PropertyCard {...mockProperty} />
          </section>
        </div>
      </div>

      <div className="w-full bg-white">
        <div className="mx-5">
          <FeaturesSection />
          <WhatsNearby />
          <HouseRules />
        </div>
      </div>
    </div>
  );
}
