import { Badge } from "@/components/ui/badge";

export function SoldBadge({ className }: { className?: string }) {
  return (
    <Badge variant="secondary" className={className}>
      Sold
    </Badge>
  );
}
