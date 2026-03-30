import type { Metadata } from "next";
import HeroSection from "@/components/sections/HeroSection";
import StatsBar from "@/components/sections/StatsBar";
import ServicesSection from "@/components/sections/ServicesSection";
import UspSection from "@/components/sections/UspSection";
import ProcessSection from "@/components/sections/ProcessSection";
import FaqSection from "@/components/sections/FaqSection";
import CtaSection from "@/components/sections/CtaSection";

export const metadata: Metadata = {
  title: "SD-Umzüge — Umzug, Reinigung & Räumung im Kanton Zürich",
  description:
    "SD-Umzüge: Professionelle Umzüge, Wohnungsreinigungen und Räumungen in Rüti ZH und der ganzen Deutschschweiz. Festpreisgarantie. Jetzt Offerte anfordern.",
};

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <StatsBar />
      <ServicesSection />
      <UspSection />
      <ProcessSection />
      <FaqSection />
      <CtaSection />
    </main>
  );
}
