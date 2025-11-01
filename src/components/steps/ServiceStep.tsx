import React from 'react';
import { BedIcon, Clock } from 'lucide-react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

import { ProceduresService } from '@/app/private/modules/admin/procedures/services/procedures';
import type {
  IListProcedure,
  IProcedure,
  IProcedureCategory,
} from '@/app/private/modules/admin/procedures/types/procedures';

interface ServiceStepProps {
  initialData: { category: IProcedureCategory; service?: IProcedure };
  onNext: (data: { service: IProcedure }) => void;
  onBack: () => void;
}

export default function ServiceStep({ onNext, onBack, initialData }: ServiceStepProps) {
  const [selectedCategory] = React.useState<IProcedureCategory>(initialData.category);
  const [selectedService, setSelectedService] = React.useState<IProcedure | null>(initialData.service ?? null);

  const queryProcedureCategory = useQuery<IListProcedure[]>({
    placeholderData: keepPreviousData,
    queryKey: ['ProcedureCategory', selectedCategory.id],
    queryFn: async () => {
      const { data, error } = await new ProceduresService().list(selectedCategory.id);
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
    if (selectedService) {
      onNext({ service: selectedService });
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
          {procedures.map(item => (
            <div
              key={item.id}
              className={`cursor-pointer transition-all duration-300 ${
                selectedService?.id === item.id ? 'ring-2 ring-pink-400 ring-offset-2' : ''
              }`}
              onClick={() => {
                setSelectedService(item);
              }}
            >
              <Card className="h-full rounded-2xl border-0 bg-white p-6 shadow-md transition-all duration-300 hover:shadow-xl">
                {/* <div className="aspect-video mb-4 overflow-hidden rounded-xl bg-gradient-to-br from-pink-100 to-rose-100">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="h-full w-full object-cover"
                  />
                </div> */}

                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-gray-800">{item.name}</h3>

                  <p className="text-sm leading-relaxed text-gray-600">{item.description}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Badge
                        variant="secondary"
                        className="bg-pink-100 text-pink-700 hover:bg-pink-100"
                      >
                        <Clock className="mr-1 h-3 w-3" />
                        {item.duration}
                      </Badge>
                    </div>

                    <div className="text-right">
                      <p className="text-2xl font-bold text-pink-600">R${item.value}</p>
                    </div>
                  </div>
                </div>

                {selectedService?.id === item.id && (
                  <div className="mt-4 rounded-xl border border-pink-200 bg-gradient-to-r from-pink-50 to-rose-50 p-3">
                    <p className="text-center text-sm font-medium text-pink-700">✨ Tratamento selecionado</p>
                  </div>
                )}
              </Card>
            </div>
          ))}
        </div>

        <div className="flex gap-4">
          <Button
            onClick={onBack}
            variant="outline"
            className="!hover:bg-transparent flex-1 rounded-xl border-gray-300 !bg-transparent py-3 font-semibold text-gray-600 transition-all duration-300 hover:border-gray-400"
          >
            Voltar
          </Button>

          <Button
            onClick={handleNext}
            disabled={!selectedService}
            className="flex-1 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:from-pink-600 hover:to-rose-600 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
          >
            Continuar
          </Button>
        </div>
      </Card>
    </div>
  );
}
