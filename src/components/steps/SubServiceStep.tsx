import React from 'react';
import { BedIcon } from 'lucide-react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

import { ProcedureCard, ProcedureCardSkeleton } from '@/components/ProcedureCard';

import { ProceduresService } from '@/app/private/modules/admin/procedures/services/procedures';
import type { IListProcedure, IProcedure } from '@/app/private/modules/admin/procedures/types/procedures';

interface Props {
  initialData: { service: IProcedure; subService?: IProcedure };
  onNext: (data: { subService: IProcedure }) => void;
  onBack: () => void;
}

export default function SubServiceStep({ onNext, onBack, initialData }: Props) {
  const [selectedService] = React.useState<IProcedure>(initialData.service);
  const [selectedSubService, setSelectedSubService] = React.useState<IProcedure | undefined>(initialData.subService);

  const queryProcedureCategory = useQuery<IListProcedure[]>({
    placeholderData: keepPreviousData,
    queryKey: ['SubProcedure', selectedService.name],
    queryFn: async () => {
      const { data, error } = await new ProceduresService().subList(selectedService.name);
      if (error) {
        return [];
      }

      return data ?? [];
    },
  });

  const procedures = React.useMemo(() => {
    const items = Array.isArray(queryProcedureCategory.data) ? queryProcedureCategory.data : [];
    return items;
  }, [queryProcedureCategory.data]);

  const handleNext = () => {
    if (selectedSubService) {
      onNext({ subService: selectedSubService });
    }
  };

  return (
    <div className="mx-auto max-w-7xl">
      <Card className="rounded-2xl border-0 bg-white/80 p-8 shadow-lg backdrop-blur-sm">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-100 to-rose-100">
            <BedIcon className="h-8 w-8 text-pink-500" />
          </div>
          <p className="text-gray-600">Escolha o tratamento ideal para você</p>
        </div>

        <div className="mb-8 grid gap-6 md:grid-cols-2">
          {queryProcedureCategory.isLoading ? (
            <>
              {Array(4)
                .fill('')
                .map((_, idx) => (
                  <ProcedureCardSkeleton key={`category_sub_procedure_${String(idx)}`} />
                ))}
            </>
          ) : (
            <>
              {procedures.map(item => (
                <ProcedureCard
                  key={item.id}
                  item={item}
                  selected={selectedSubService}
                  onSelect={() => {
                    setSelectedSubService(item);
                  }}
                />
              ))}
            </>
          )}
        </div>

        <div className="flex gap-4">
          <Button
            className="!hover:bg-transparent flex-1 rounded-xl border-gray-300 !bg-transparent py-3 font-semibold text-gray-600 transition-all duration-300 hover:border-gray-400"
            variant="outline"
            onClick={onBack}
          >
            Voltar
          </Button>

          <Button
            className="flex-1 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:from-pink-600 hover:to-rose-600 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
            disabled={!selectedSubService}
            onClick={handleNext}
          >
            Continuar
          </Button>
        </div>
      </Card>
    </div>
  );
}
