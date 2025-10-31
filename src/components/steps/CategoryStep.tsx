import React from 'react';
import { BedIcon } from 'lucide-react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { type Category } from '@/data/mockData';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

import { ProceduresService } from '@/app/private/modules/admin/procedures/services/procedures';
import type { IListProcedureCategory } from '@/app/private/modules/admin/procedures/types/procedures';

interface CategoryStepProps {
  initialData: { category?: Category };
  onNext: (data: { category: Category }) => void;
  onBack: () => void;
}

export default function CategoryStep({ onNext, onBack, initialData }: CategoryStepProps) {
  const [selectedCategory, setSelectedCategory] = React.useState<Category | null>(initialData.category ?? null);

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
    <div className="mx-auto max-w-4xl">
      <Card className="rounded-2xl border-0 bg-white/80 p-8 shadow-lg backdrop-blur-sm">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-100 to-rose-100">
            <BedIcon className="h-8 w-8 text-pink-500" />
          </div>
          <p className="text-gray-600">Escolha o tipo de tratamento ideal para você</p>
        </div>

        <div className="mb-8 grid gap-6 md:grid-cols-2">
          {categories.map(item => (
            <div
              key={item.id}
              className={`cursor-pointer transition-all duration-300 ${
                selectedCategory?.id === item.id ? 'ring-2 ring-pink-400 ring-offset-2' : ''
              }`}
              onClick={() => {
                setSelectedCategory(item);
              }}
            >
              <Card className="h-full rounded-2xl border-0 bg-white p-6 shadow-md transition-all duration-300 hover:shadow-xl">
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-gray-800">{item.name}</h3>

                  <p className="text-sm leading-relaxed text-gray-600">{item.description}</p>
                </div>

                {selectedCategory?.id === item.id && (
                  <div className="mt-4 rounded-xl border border-pink-200 bg-gradient-to-r from-pink-50 to-rose-50 p-3">
                    <p className="text-center text-sm font-medium text-pink-700">✨ Categoria selecionada</p>
                  </div>
                )}
              </Card>
            </div>
          ))}
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
