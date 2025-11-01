import React from 'react';
import { BedIcon } from 'lucide-react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { Step } from '@/components/steps';
import { ProcedureCard, ProcedureCardSkeleton } from '@/components/ProcedureCard';

import { ProceduresService } from '@/app/private/modules/admin/procedures/services/procedures';
import type { IListProcedure, IProcedure } from '@/app/private/modules/admin/procedures/types/procedures';

interface Props {
  initialData: { service: IProcedure; subService?: IProcedure };
  onNext: (data: { subService: IProcedure | undefined }) => void;
  onBack: () => void;
}

const SubServiceStep = ({ onNext, onBack, initialData }: Props) => {
  const [selectedService] = React.useState<IProcedure>(initialData.service);
  const [selected, setSelected] = React.useState<IProcedure | undefined>(initialData.subService);

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
    if (queryProcedureCategory.isLoading) {
      return [];
    }

    const items = Array.isArray(queryProcedureCategory.data) ? queryProcedureCategory.data : [];
    if (items.length === 0) {
      items.push(selectedService);
    }

    if (items.length === 1) {
      setSelected(items[0]);
    }

    return items;
  }, [queryProcedureCategory.data, queryProcedureCategory.isLoading, selectedService]);

  const handleNext = () => {
    if (selected) {
      onNext({ subService: selected });
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
              <ProcedureCardSkeleton key={`category_sub_procedure_${String(idx)}`} />
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
};

export { SubServiceStep };
