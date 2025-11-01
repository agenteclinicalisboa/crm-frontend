import React from 'react';
import { BedIcon } from 'lucide-react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { Step } from '@/components/steps';
import { CategoryProcedureCard, CategoryProcedureCardSkeleton } from '@/components/CategoryProcedureCard';

import { ProceduresService } from '@/app/private/modules/admin/procedures/services/procedures';
import type {
  IListProcedureCategory,
  IProcedureCategory,
} from '@/app/private/modules/admin/procedures/types/procedures';

interface CategoryStepProps {
  initialData: { category?: IProcedureCategory };
  onNext: (data: { category: IProcedureCategory }) => void;
  onBack: () => void;
}

export default function CategoryStep({ onNext, onBack, initialData }: CategoryStepProps) {
  const [selected, setSelected] = React.useState<IProcedureCategory | undefined>(initialData.category);

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
      icon={<BedIcon className="h-8 w-8 text-pink-500" />}
      canNext={!!selected}
      handleNext={handleNext}
      onBack={onBack}
    >
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
    </Step>
  );
}
