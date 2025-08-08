import { useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2 } from "lucide-react";

type DemoSectionProps = { className?: string };

export function DemoSection({ className }: DemoSectionProps) {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [tags, setTags] = useState<string[]>([]);

  function handleClear() {
    setUrl("");
    setTags([]);
  }

  function extractTags(u: string): string[] {
    try {
      const { hostname, pathname } = new URL(u.trim());
      const host = hostname.replace("www.", "");
      const base = host.split(".")[0];
      const parts = pathname
        .split("/")
        .map((p) => p.trim())
        .filter(Boolean)
        .slice(0, 3);

      const keywords = [base, ...parts]
        .flatMap((p) => p.split(/[-_]/g))
        .filter((p) => p.length > 1)
        .slice(0, 5);

      const uniq = Array.from(new Set(keywords.map((k) => k.toLowerCase())));
      const noise = new Set(["blog", "post", "read", "docs", "article"]);
      const result = uniq
        .filter((k) => !noise.has(k))
        .slice(0, 4)
        .map((k) => `#${k}`);

      return result.length ? result : ["#link", "#estudos", "#notia"];
    } catch {
      return ["#link", "#estudos", "#notia"];
    }
  }

  async function handleGenerate() {
    if (!url.trim()) {
      setTags(["#exemplo", "#tags", "#notia"]);
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200)); // simulação de processamento
    setTags(extractTags(url));
    setLoading(false);
  }

  return (
    <section
      id="demo"
      className={cn("mx-auto max-w-7xl px-6 pb-20", className)}
    >
      <div className="grid items-start gap-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ type: "spring", stiffness: 120, damping: 18 }}
        >
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Veja a IA em ação</CardTitle>
              <CardDescription>
                Cole um link de estudo e receba tags sugeridas automaticamente.
              </CardDescription>
            </CardHeader>

            <CardContent className="grid gap-3">
              <Label htmlFor="demo-url">URL</Label>
              <Input
                id="demo-url"
                placeholder="Cole uma URL aqui"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                autoComplete="off"
                inputMode="url"
              />

              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </CardContent>

            <CardFooter className="justify-between gap-3">
              <Button
                variant="outline"
                onClick={handleClear}
                disabled={loading}
              >
                Limpar
              </Button>

              <Button
                className="px-6"
                onClick={handleGenerate}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2
                      className="mr-2 h-4 w-4 animate-spin"
                      aria-hidden
                    />
                    Gerando…
                  </>
                ) : (
                  "Gerar tags"
                )}
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
