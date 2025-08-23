import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";

import { Button } from "@/components/ui/button";

export function CtaSection() {
  return (
    <motion.section
      id="cta"
      className="bg-muted/50 border-t"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ type: "spring", stiffness: 120, damping: 18 }}
    >
      <div className="mx-auto grid max-w-7xl items-center gap-6 px-6 py-14 md:grid-cols-2">
        <div>
          <h3 className="text-2xl font-bold">Organize seus estudos com o Notia</h3>
          <p className="text-muted-foreground mt-2">Comece grátis hoje. Leva menos de 1 minuto.</p>
        </div>
        <div className="flex justify-start md:justify-end">
          <Button className="px-6" asChild>
            <Link to={"/auth/register"}>Criar conta</Link>
          </Button>
        </div>
      </div>
    </motion.section>
  );
}
