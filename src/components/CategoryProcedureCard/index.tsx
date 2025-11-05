import { Card } from '@/components/ui/card';

import { CategoryProcedureCardSkeleton } from '@/components/CategoryProcedureCard/skeleton';

import type { IBookingCreate } from '@/app/private/modules/client/booking/types/booking';

interface Props {
  item: IBookingCreate['category'];
  selected?: IBookingCreate['category'];
  onSelect: () => void;
}

const CategoryProcedureCard = ({ item, selected, onSelect }: Props) => {
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
      <Card className="h-full space-y-2 rounded-2xl border-0 bg-white p-4 md:p-6 shadow-md transition-all duration-300 hover:shadow-xl md:space-y-4">
        <div className="space-y-2 md:space-y-3">
          <h3 className="font-semibold text-gray-800 md:text-xl">{item.name}</h3>

          <p className="text-sm leading-relaxed text-gray-600">{item.description}</p>
        </div>

        {selected?.id === item.id && (
          <div className="rounded-xl border border-pink-200 bg-gradient-to-r from-pink-50 to-rose-50 p-3">
            <p className="text-center text-sm font-medium text-pink-700">✨ Categoria selecionada</p>
          </div>
        )}
      </Card>
    </div>
  );
};

export { CategoryProcedureCard, CategoryProcedureCardSkeleton };
