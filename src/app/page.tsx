import PropertyCard from "@/components/property/PropertyCard";
import { mockProperty, mockReviews } from "@/lib/services/mockData";
import ReviewSection from "@/components/property/ReviewSection";
import HeroSection from "@/components/home/HeroSection";
import FeaturesSection from "@/components/home/FeaturesSection";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <div className="w-full bg-[#F5F4F1]">
        <div className="mx-5">
          <HeroSection />

          {/* Main Content */}
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
          <ReviewSection reviews={mockReviews} />
        </div>
      </div>
    </div>
  );
}
