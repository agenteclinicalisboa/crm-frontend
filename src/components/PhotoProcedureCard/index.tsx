import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

import { PhotoProcedureCardSkeleton } from '@/components/PhotoProcedureCard/skeleton';

interface Props {
  id: string;
  photo_url: string;
  procedure: string;
}

const PhotoProcedureCard = ({ id, photo_url, procedure }: Props) => {
  return (
    <Card
      key={id}
      className="relative rounded-2xl border-0 bg-white p-3 shadow-md"
    >
      <div className="absolute right-3">
        <Badge
          variant="secondary"
          className="bg-pink-100 text-pink-700 hover:bg-pink-100"
        >
          {procedure}
        </Badge>
      </div>

      <div className="aspect-square overflow-hidden rounded-xl bg-gradient-to-br from-gray-100 to-gray-200">
        <img
          className="h-56 w-full object-cover"
          alt="Antes e depois do tratamento"
          src={photo_url}
        />
      </div>
    </Card>
  );
};

export { PhotoProcedureCard, PhotoProcedureCardSkeleton };
