import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const ProfessionalCardSkeleton = () => {
  return (
    <div className="cursor-pointer transition-all duration-300">
      <Card className="h-full rounded-2xl border-0 bg-white p-6 shadow-md transition-all duration-300 hover:shadow-xl">
        <div className="space-y-3">
          <Skeleton className="h-6 w-1/3" />

          <Skeleton className="h-4" />
          <Skeleton className="h-4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </Card>
    </div>
  );
};

export { ProfessionalCardSkeleton };
