import { createFileRoute } from "@tanstack/react-router";

import { AnimatedBackground } from "@/components/common/animated-background.tsx";
import { FooterSection } from "@/components/footer-section";
import { NavHeader } from "@/components/nav-header";
import { CtaSection } from "@/routes/_public/-components/cta-section.tsx";
import { DemoSection } from "@/routes/_public/-components/demo-section.tsx";
import { FaqSection } from "@/routes/_public/-components/faq-section.tsx";
import { FeaturesGrid } from "@/routes/_public/-components/features-grid.tsx";
import { HeroSection } from "@/routes/_public/-components/hero-section.tsx";
import { PricingSection } from "@/routes/_public/-components/pricing-section.tsx";
import { SocialProof } from "@/routes/_public/-components/social-proof.tsx";

export const Route = createFileRoute("/_public/")({
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
