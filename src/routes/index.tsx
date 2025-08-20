import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";

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
      {/* ===== FUNDO GLOBAL ===== */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
        {/* Gradiente de topo */}
        <div className="from-primary/10 absolute inset-x-0 top-0 h-[500px] bg-gradient-to-b via-transparent to-transparent" />

        {/* Bolha esquerda animada */}
        <motion.div
          className="bg-primary/20 absolute top-40 -left-40 h-96 w-96 rounded-full blur-3xl"
          animate={{
            x: [0, 20, -15, 0],
            y: [0, -15, 10, 0],
            scale: [1, 1.05, 0.97, 1], // pulso suave
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Bolha direita animada */}
        <motion.div
          className="absolute top-96 right-0 h-96 w-96 rounded-full bg-blue-400/10 blur-3xl dark:bg-blue-500/10"
          animate={{
            x: [0, -20, 15, 0],
            y: [0, 10, -15, 0],
            scale: [1, 1.04, 0.96, 1], // pulso suave
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Textura sutil */}
        <div className="bg-[radial-gradient(circle_at_1px_1px,theme(colors.primary/5)_1px,transparent_0)] absolute inset-0 bg-[size:40px_40px] opacity-20" />
      </div>

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
