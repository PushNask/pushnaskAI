import { Skeleton } from "@/components/ui/skeleton";

interface LoadingProps {
  className?: string;
}

export const CVLoadingState = ({ className = "" }: LoadingProps) => (
  <div className={`space-y-4 ${className}`}>
    <Skeleton className="h-8 w-3/4" />
    <Skeleton className="h-32 w-full" />
    <Skeleton className="h-8 w-1/2" />
  </div>
);