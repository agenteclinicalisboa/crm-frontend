import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const PhotoProcedureCardSkeleton = () => {
  return (
    <div className="cursor-pointer transition-all duration-300">
      <Card className="relative rounded-2xl border-0 bg-white p-3 shadow-md">
        <div className="aspect-square overflow-hidden rounded-xl bg-gradient-to-br from-gray-100 to-gray-200">
          <Skeleton className="h-56 w-full" />
        </div>
      </Card>
    </div>
  );
};

export { PhotoProcedureCardSkeleton };
