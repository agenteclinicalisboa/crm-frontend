import { ClockIcon } from 'lucide-react';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

import { ProcedureCardSkeleton } from '@/components/ProcedureCard/skeleton';

import { currency, formatDuration } from '@/app/core/shared/utils';

import type { IBookingCreate } from '@/app/private/modules/client/booking/types/booking';

interface Props {
  item: IBookingCreate['service'];
  selected?: IBookingCreate['service'];
  showDetails?: boolean;
  onSelect: () => void;
}

const ProcedureCard = ({ item, selected, showDetails, onSelect }: Props) => {
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
      <Card className="h-full space-y-2 rounded-2xl border-0 bg-white p-4 shadow-md transition-all duration-300 hover:shadow-xl md:space-y-4 md:p-6">
        <div className="space-y-2 md:space-y-3">
          <h3 className="font-semibold text-gray-800 md:text-xl">{item.name}</h3>

          <p className="text-sm leading-relaxed text-gray-600">{item.description}</p>

          {showDetails && (
            <div className="flex items-center justify-between">
              <Badge
                className="bg-pink-100 text-pink-700 hover:bg-pink-100"
                variant="secondary"
              >
                <ClockIcon className="mr-1 h-3 w-3" />
                {formatDuration(item.duration)}
              </Badge>

              <div className="text-right">
                <p className="text-xl font-bold text-pink-600 md:text-2xl">{currency(item.value)}</p>
              </div>
            </div>
          )}
        </div>

        {selected?.id === item.id && (
          <div className="rounded-xl border border-pink-200 bg-gradient-to-r from-pink-50 to-rose-50 p-3">
            <p className="text-center text-sm font-medium text-pink-700">✨ Tratamento selecionado</p>
          </div>
        )}
      </Card>
    </div>
  );
};

export { ProcedureCard, ProcedureCardSkeleton };
