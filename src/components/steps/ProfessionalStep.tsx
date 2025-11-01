import React, { useState } from 'react';
import { User } from 'lucide-react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

import type { IBookingCreate } from '@/app/private/modules/client/booking/types/booking';

import type { IListProfessional, IProfessional } from '@/app/private/modules/admin/professionals/types/professionals';
import { ProfessionalsService } from '@/app/private/modules/admin/professionals/services/professionals';

interface ProfessionalStepProps {
  initialData: {
    service: IBookingCreate['service'];
    professional?: IBookingCreate['professional'];
  };
  onNext: (data: { professional: IBookingCreate['professional'] }) => void;
  onBack: () => void;
}

const ProfessionalStep = ({ onNext, onBack, initialData }: ProfessionalStepProps) => {
  const [selectedProfessional, setSelectedProfessional] = useState<IProfessional | null>(
    initialData.professional ?? null
  );

  const queryProfessionals = useQuery<IListProfessional[]>({
    placeholderData: keepPreviousData,
    queryKey: ['Professionals'],
    queryFn: async () => {
      const { data, error } = await new ProfessionalsService().list();
      if (error) {
        return [];
      }

      return data ?? [];
    },
  });

  const professionals = React.useMemo(() => {
    const items = Array.isArray(queryProfessionals.data) ? queryProfessionals.data : [];
    return items;
  }, [queryProfessionals.data]);

  const handleNext = () => {
    if (selectedProfessional) {
      onNext({ professional: selectedProfessional });
    }
  };

  return (
    <div className="mx-auto max-w-7xl">
      <Card className="rounded-2xl border-0 bg-white/80 p-8 shadow-lg backdrop-blur-sm">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-100 to-rose-100">
            <User className="h-8 w-8 text-pink-500" />
          </div>
          <p className="text-gray-600">Escolha o profissional para seu atendimento</p>
        </div>

        <div className="mb-8 grid gap-6 md:grid-cols-4">
          {professionals.map(item => (
            <div
              key={item.id}
              className={`cursor-pointer transition-all duration-300 ${
                selectedProfessional?.id === item.id ? 'ring-2 ring-pink-400 ring-offset-2' : ''
              }`}
              onClick={() => {
                setSelectedProfessional(item);
              }}
            >
              <Card className="h-full rounded-2xl border-0 bg-white p-6 text-center shadow-md transition-all duration-300 hover:shadow-xl">
                <div className="mb-4">
                  <div className="mx-auto mb-4 h-20 w-20 overflow-hidden rounded-full bg-gradient-to-br from-pink-100 to-rose-100">
                    <img
                      src={item.image_url}
                      alt={item.nome}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <h3 className="mb-2 text-lg font-semibold text-gray-800">{item.nome}</h3>

                  <p className="mb-3 text-sm text-gray-600">{item.profissao}</p>

                  {/* <div className="flex items-center justify-center gap-1">
                    <Star className="h-4 w-4 fill-current text-yellow-400" />
                    <span className="text-sm font-medium text-gray-700">{item.rating}</span>
                  </div> */}
                </div>

                {selectedProfessional?.id === item.id && (
                  <div className="mt-4 rounded-xl border border-pink-200 bg-gradient-to-r from-pink-50 to-rose-50 p-3">
                    <p className="text-sm font-medium text-pink-700">✨ Profissional selecionado</p>
                  </div>
                )}
              </Card>
            </div>
          ))}
        </div>

        <div className="mb-6 rounded-xl bg-pink-50 p-4">
          <p className="text-sm text-pink-700">
            💡 <strong>Dica:</strong> Todos os nossos profissionais são qualificados e experientes. Você pode escolher
            qualquer um com confiança!
          </p>
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
            disabled={!selectedProfessional}
            onClick={handleNext}
          >
            Continuar
          </Button>
        </div>
      </Card>
    </div>
  );
};

export { ProfessionalStep };
