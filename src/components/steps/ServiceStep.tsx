import React from 'react';
import { BedIcon } from 'lucide-react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { Step } from '@/components/steps';
import { ProcedureCard, ProcedureCardSkeleton } from '@/components/ProcedureCard';

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
  const [selected, setSelected] = React.useState<IProcedure | undefined>(initialData.service);

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
    if (selected) {
      onNext({ service: selected });
    }
  };

  return (
    <Step
      title="Escolha o tratamento ideal para você"
      icon={<BedIcon className="h-8 w-8 text-pink-500" />}
      canNext={!!selected}
      handleNext={handleNext}
      onBack={onBack}
    >
      {queryProcedureCategory.isLoading ? (
        <>
          {Array(4)
            .fill('')
            .map((_, idx) => (
              <ProcedureCardSkeleton key={`category_procedure_${String(idx)}`} />
            ))}
        </>
      ) : (
        <>
          {procedures.map(item => (
            <ProcedureCard
              key={item.id}
              item={item}
              selected={selected}
              onSelect={() => {
                setSelected(item);
              }}
            />
          ))}
        </>
      )}
    </Step>
  );
}
