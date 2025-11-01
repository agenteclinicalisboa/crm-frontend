import React from 'react';
import { BedIcon } from 'lucide-react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { Step } from '@/components/steps';
import { CategoryProcedureCard, CategoryProcedureCardSkeleton } from '@/components/CategoryProcedureCard';

import type { IBookingCreate } from '@/app/private/modules/client/booking/types/booking';

import { ProceduresService } from '@/app/private/modules/admin/procedures/services/procedures';
import type { IListProcedureCategory } from '@/app/private/modules/admin/procedures/types/procedures';

interface CategoryStepProps {
  initialData: { category?: IBookingCreate['category'] };
  onNext: (data: { category: IBookingCreate['category'] }) => void;
  onBack: () => void;
}

const CategoryStep = ({ onNext, onBack, initialData }: CategoryStepProps) => {
  const [selected, setSelected] = React.useState<IBookingCreate['category'] | undefined>(initialData.category);

  const queryProcedureCategories = useQuery<IListProcedureCategory[]>({
    placeholderData: keepPreviousData,
    queryKey: ['ProcedureCategories'],
    queryFn: async () => {
      const { data, error } = await new ProceduresService().categoriesList();
      if (error) {
        return [];
      }

      return data ?? [];
    },
  });

  const categories = React.useMemo(() => {
    const items = Array.isArray(queryProcedureCategories.data) ? queryProcedureCategories.data : [];
    return items;
  }, [queryProcedureCategories.data]);

  const handleNext = () => {
    if (selected) {
      onNext({ category: selected });
    }
  };

  return (
    <Step
      title="Escolha o tipo de tratamento ideal para você"
      icon={<BedIcon className="h-6 w-6 text-pink-500" />}
      canNext={!!selected}
      handleNext={handleNext}
      onBack={onBack}
    >
      <div className="max-h-[49vh] overflow-auto">
        <div className="m-3 grid gap-6 md:grid-cols-2">
          {queryProcedureCategories.isLoading ? (
            <>
              {Array(4)
                .fill('')
                .map((_, idx) => (
                  <CategoryProcedureCardSkeleton key={`category_${String(idx)}`} />
                ))}
            </>
          ) : (
            <>
              {categories.map(item => (
                <CategoryProcedureCard
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
        </div>
      </div>
    </Step>
  );
};

export { CategoryStep };
