import React from 'react';
import { BedIcon } from 'lucide-react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { Step } from '@/components/steps';
import { ProcedureCard, ProcedureCardSkeleton } from '@/components/ProcedureCard';

import type { IBookingCreate } from '@/app/private/modules/client/booking/types/booking';

import { ProceduresService } from '@/app/private/modules/admin/procedures/services/procedures';
import type { IListProcedure } from '@/app/private/modules/admin/procedures/types/procedures';

interface Props {
  initialData: {
    service: IBookingCreate['service'];
    subService?: IBookingCreate['subService'];
  };
  onNext: (data: { subService?: IBookingCreate['subService'] }) => void;
  onBack: () => void;
}

const SubServiceStep = ({ onNext, onBack, initialData }: Props) => {
  const [selectedService] = React.useState<IBookingCreate['service']>(initialData.service);
  const [selected, setSelected] = React.useState<IBookingCreate['subService'] | undefined>(initialData.subService);

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
      icon={<BedIcon className="h-6 w-6 text-pink-500" />}
      canNext={!!selected}
      handleNext={handleNext}
      onBack={onBack}
    >
      <div className="max-h-[49vh] overflow-auto">
        <div className="m-3 grid gap-6 md:grid-cols-2">
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
                  showDetails
                  onSelect={() => {
                    setSelected(item);
                  }}
                />
              ))}
            </>
          )}
        </div>
      </div>
    </Step>
  );
};

export { SubServiceStep };
