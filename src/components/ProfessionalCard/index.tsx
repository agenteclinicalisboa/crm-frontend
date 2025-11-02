import { Card } from '@/components/ui/card';

import { ProfessionalCardSkeleton } from '@/components/ProfessionalCard/skeleton';

import type { IBookingCreate } from '@/app/private/modules/client/booking/types/booking';

interface Props {
  item: IBookingCreate['professional'];
  selected?: IBookingCreate['professional'];
  onSelect: () => void;
}

const ProfessionalCard = ({ item, selected, onSelect }: Props) => {
  const { name, profession, biography, image_url } = item;

  return (
    <div
      key={item.id}
      className={`cursor-pointer rounded-md border transition-all duration-300 ${
        selected?.id === item.id ? 'ring-2 ring-pink-400 ring-offset-2' : ''
      }`}
      onClick={() => {
        onSelect();
      }}
    >
      <Card className="h-full rounded-2xl border-0 bg-white p-6 shadow-md transition-all duration-300 hover:shadow-xl">
        <div className="flex items-center gap-3">
          <img
            src={image_url}
            alt={`Foto de ${name}`}
            className="h-16 w-16 flex-shrink-0 rounded-full object-cover shadow-sm"
          />

          <div className="flex-1 space-y-2">
            <div className="flex items-center justify-between gap-2">
              <div>
                <h3 className="text-md font-semibold leading-tight">{name}</h3>
                <p className="text-sm text-gray-500">{profession}</p>
              </div>

              <div className="flex items-center gap-2">
                <span className="rounded-full bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-600">
                  Disponível
                </span>
              </div>
            </div>

            <p className="text-sm text-gray-600">{biography}</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export { ProfessionalCard, ProfessionalCardSkeleton };
