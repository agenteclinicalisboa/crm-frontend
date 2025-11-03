import React from 'react';
import { ImageIcon } from 'lucide-react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

import type { IBookingCreate } from '@/app/private/modules/client/booking/types/booking';

import { ProceduresService } from '@/app/private/modules/admin/procedures/services/procedures';
import type { IProcedurePhotos } from '@/app/private/modules/admin/procedures/types/procedures';

interface PhotosStepProps {
  initialData: {
    service: IBookingCreate['service'];
  };
  onNext: () => void;
  onBack: () => void;
}

const PhotosStep = ({ initialData, onNext, onBack }: PhotosStepProps) => {
  const [selectedService] = React.useState<IBookingCreate['service']>(initialData.service);

  const queryProcedurePhotos = useQuery<IProcedurePhotos[]>({
    placeholderData: keepPreviousData,
    queryKey: ['ProcedurePhotos', selectedService.name],
    queryFn: async () => {
      const { data, error } = await new ProceduresService().photos(selectedService.name);
      if (error) {
        return [];
      }

      return data ?? [];
    },
  });

  const photos = React.useMemo(() => {
    const items = Array.isArray(queryProcedurePhotos.data) ? queryProcedurePhotos.data : [];

    return items.map(item => ({
      id: item.id,
      photo_url: `https://lh3.googleusercontent.com/d/${item.id}=w1000?authuser=1/view`,
    }));
  }, [queryProcedurePhotos.data]);

  return (
    <div className="mx-auto max-w-4xl">
      <Card className="rounded-2xl border-0 bg-white/80 p-8 shadow-lg backdrop-blur-sm space-y-6">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-100 to-rose-100">
            <ImageIcon className="h-8 w-8 text-pink-500" />
          </div>
          <h3 className="mb-2 text-2xl font-bold text-gray-800">Resultados que falam por si</h3>
          <p className="text-gray-600">Veja alguns dos nossos resultados antes de finalizar seu agendamento</p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {photos.map(photo => (
            <Card
              key={photo.id}
              className="relative rounded-2xl border-0 bg-white p-3 shadow-md"
            >
              <div className="absolute right-3">
                <Badge
                  variant="secondary"
                  className="bg-pink-100 text-pink-700 hover:bg-pink-100"
                >
                  {selectedService.name}
                </Badge>
              </div>

              <div className="aspect-square overflow-hidden rounded-xl bg-gradient-to-br from-gray-100 to-gray-200">
                <img
                  className="h-auto w-full object-cover"
                  alt="Antes e depois do tratamento"
                  src={photo.photo_url}
                />
              </div>
            </Card>
          ))}
        </div>

        <div className="rounded-2xl bg-gradient-to-r from-pink-50 to-rose-50 p-6 text-center">
          <h4 className="mb-2 text-lg font-semibold text-pink-800">✨ Sua transformação começa aqui</h4>
          <p className="text-pink-700">
            Cada resultado é único e personalizado. Estamos ansiosos para ajudar você a alcançar seus objetivos de
            beleza e bem-estar.
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
            className="flex-1 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:from-pink-600 hover:to-rose-600 hover:shadow-xl"
            onClick={onNext}
          >
            Finalizar agendamento
          </Button>
        </div>
      </Card>
    </div>
  );
};

export { PhotosStep };
