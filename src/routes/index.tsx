import { createFileRoute } from "@tanstack/react-router";
import { NavHeader } from "@/components/nav-header.tsx";
import { HeroSection } from "@/routes/-components/hero-section.tsx";
import { SocialProof } from "@/routes/-components/social-proof.tsx";
import { FeaturesGrid } from "@/routes/-components/features-grid.tsx";
import { DemoSection } from "@/routes/-components/demo-section.tsx";
import { PricingSection } from "@/routes/-components/pricing-section.tsx";
import { FaqSection } from "@/routes/-components/faq-section.tsx";
import { CtaSection } from "@/routes/-components/cta-section.tsx";
import { FooterSection } from "@/components/footer-section.tsx";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="min-h-dvh bg-background text-foreground">
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
