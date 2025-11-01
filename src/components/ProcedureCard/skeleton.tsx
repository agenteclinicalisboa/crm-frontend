import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const ProcedureCardSkeleton = () => {
  return (
    <div className="cursor-pointer transition-all duration-300">
      <Card className="h-full rounded-2xl border-0 bg-white p-6 shadow-md transition-all duration-300 hover:shadow-xl">
        <div className="space-y-3">
          <Skeleton className="h-6 w-1/3" />

          <Skeleton className="h-4" />
          <Skeleton className="h-4" />
          <Skeleton className="h-4 w-1/2" />

          <div className="flex justify-between">
            <Skeleton className="h-4 w-14" />
            <Skeleton className="h-4 w-28" />
          </div>
        </div>
      </Card>
    </div>
  );
};

export { ProcedureCardSkeleton };
