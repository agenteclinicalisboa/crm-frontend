import { ClockIcon } from 'lucide-react';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

import { ProcedureCardSkeleton } from '@/components/ProcedureCard/skeleton';

import { currency, formatDuration } from '@/app/core/shared/utils';

import type { IProcedure } from '@/app/private/modules/admin/procedures/types/procedures';

interface Props {
  item: IProcedure;
  selected?: IProcedure;
  onSelect: () => void;
}

const ProcedureCard = ({ item, selected, onSelect }: Props) => {
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
        <div className="space-y-3">
          <h3 className="text-xl font-semibold text-gray-800">{item.name}</h3>

          <p className="text-sm leading-relaxed text-gray-600">{item.description}</p>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Badge
                className="bg-pink-100 text-pink-700 hover:bg-pink-100"
                variant="secondary"
              >
                <ClockIcon className="mr-1 h-3 w-3" />
                {formatDuration(item.duration)}
              </Badge>
            </div>

            <div className="text-right">
              <p className="text-2xl font-bold text-pink-600">{currency(item.value)}</p>
            </div>
          </div>
        </div>

        {selected?.id === item.id && (
          <div className="mt-4 rounded-xl border border-pink-200 bg-gradient-to-r from-pink-50 to-rose-50 p-3">
            <p className="text-center text-sm font-medium text-pink-700">✨ Tratamento selecionado</p>
          </div>
        )}
      </Card>
    </div>
  );
};

export { ProcedureCard, ProcedureCardSkeleton };
