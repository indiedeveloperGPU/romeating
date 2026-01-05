import Hero from "@/components/Hero";
import FeatureCards from "@/components/FeatureCards";

export default function Home() {
  return (
    <div className="flex flex-col gap-20 pb-20">
      <Hero />
      <FeatureCards />
    </div>
  );
}
