import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.tsx";

type Props = { linksCount: number; publicFoldersCount: number };

export function SummaryCards({ linksCount, publicFoldersCount }: Props) {
  return (
    <section className="grid grid-cols-2 gap-3">
      <Card>
        <CardHeader className="pb-1">
          <CardTitle className="text-muted-foreground text-xs">LINKS</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <p className="text-2xl font-semibold">{linksCount}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-1">
          <CardTitle className="text-muted-foreground text-xs">PASTAS PÚBLICAS</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <p className="text-2xl font-semibold">{publicFoldersCount}</p>
        </CardContent>
      </Card>
    </section>
  );
}
