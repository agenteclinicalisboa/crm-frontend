import React from 'react';
import { BedIcon } from 'lucide-react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

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
  const [selectedCategory, setSelectedCategory] = React.useState<IProcedureCategory | null>(
    initialData.category ?? null
  );

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
    if (selectedCategory) {
      onNext({ category: selectedCategory });
    }
  };

  return (
    <div className="mx-auto max-w-7xl">
      <Card className="rounded-2xl border-0 bg-white/80 p-8 shadow-lg backdrop-blur-sm">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-100 to-rose-100">
            <BedIcon className="h-8 w-8 text-pink-500" />
          </div>
          <p className="text-gray-600">Escolha o tipo de tratamento ideal para você</p>
        </div>

        <div className="mb-8 grid gap-6 md:grid-cols-2">
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
                  category={item}
                  onSelect={() => {
                    setSelectedCategory(item);
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
            disabled={!selectedCategory}
            onClick={handleNext}
          >
            Continuar
          </Button>
        </div>
      </Card>
    </div>
  );
}
