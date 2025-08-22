export function LineSkeleton({ w = "w-40", h = "h-4" }: { w?: string; h?: string }) {
  return <div className={`bg-muted ${h} ${w} animate-pulse rounded`} />;
}

export function AvatarSkeleton() {
  return <div className="bg-muted h-8 w-8 animate-pulse rounded-md" />;
}
