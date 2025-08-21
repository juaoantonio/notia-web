import { createFileRoute } from "@tanstack/react-router";

import { AnimatedBackground } from "@/components/common/animated-background.tsx";
import { FooterSection } from "@/components/footer-section";
import { NavHeader } from "@/components/nav-header";
import { CtaSection } from "@/routes/-components/cta-section";
import { DemoSection } from "@/routes/-components/demo-section";
import { FaqSection } from "@/routes/-components/faq-section";
import { FeaturesGrid } from "@/routes/-components/features-grid";
import { HeroSection } from "@/routes/-components/hero-section";
import { PricingSection } from "@/routes/-components/pricing-section";
import { SocialProof } from "@/routes/-components/social-proof";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="relative overflow-hidden">
      <AnimatedBackground />

      <NavHeader />
      <HeroSection />
      <SocialProof />
      <FeaturesGrid />
      <DemoSection />
      <PricingSection />
      <FaqSection />
      <CtaSection />
      <FooterSection />
    </div>
  );
}
