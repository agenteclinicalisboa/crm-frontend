import React from 'react';
import { BedIcon } from 'lucide-react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { Step } from '@/components/steps';
import { ProcedureCard, ProcedureCardSkeleton } from '@/components/ProcedureCard';

import type { IBookingCreate } from '@/app/private/modules/client/booking/types/booking';

import { ProceduresService } from '@/app/private/modules/admin/procedures/services/procedures';
import type { IListProcedure } from '@/app/private/modules/admin/procedures/types/procedures';

interface ServiceStepProps {
  initialData: {
    category: IBookingCreate['category'];
    service?: IBookingCreate['service'];
  };
  onNext: (data: { service: IBookingCreate['service'] }) => void;
  onBack: () => void;
}

const ServiceStep = ({ onNext, onBack, initialData }: ServiceStepProps) => {
  const [selectedCategory] = React.useState<IBookingCreate['category']>(initialData.category);
  const [selected, setSelected] = React.useState<IBookingCreate['service'] | undefined>(initialData.service);

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
      icon={<BedIcon className="h-6 w-6 text-pink-500" />}
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
};

export { ServiceStep };
