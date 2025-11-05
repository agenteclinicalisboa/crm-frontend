import React from 'react';
import { ImageIcon } from 'lucide-react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

import { PhotoProcedureCard, PhotoProcedureCardSkeleton } from '@/components/PhotoProcedureCard';

import type { IBookingCreate } from '@/app/private/modules/client/booking/types/booking';

import { ProceduresService } from '@/app/private/modules/admin/procedures/services/procedures';
import type { IProcedurePhoto } from '@/app/private/modules/admin/procedures/types/procedures';

interface PhotosStepProps {
  initialData: {
    service: IBookingCreate['service'];
  };
  onNext: () => void;
  onBack: () => void;
}

const PhotosStep = ({ initialData, onNext, onBack }: PhotosStepProps) => {
  const [selectedService] = React.useState<IBookingCreate['service']>(initialData.service);

  const queryProcedurePhotos = useQuery<IProcedurePhoto[]>({
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
    <div className="mx-auto md:max-w-4xl">
      <Card className="space-y-4 rounded-2xl border-0 bg-white/80 p-6 shadow-lg backdrop-blur-sm md:space-y-6 md:p-8">
        <div className="space-y-3 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-100 to-rose-100 md:h-16 md:w-16">
            <ImageIcon className="h-6 w-6 text-pink-500 md:h-8 md:w-8" />
          </div>
          <h3 className="text-xl font-bold text-gray-800 md:text-2xl">Resultados que falam por si</h3>
          <p className="text-gray-600">Veja alguns dos nossos resultados antes de finalizar seu agendamento</p>
        </div>

        <div className="m-1 grid gap-3 md:grid-cols-3 md:gap-6">
          {queryProcedurePhotos.isLoading ? (
            <>
              <PhotoProcedureCardSkeleton />
              <PhotoProcedureCardSkeleton />
              <PhotoProcedureCardSkeleton />
            </>
          ) : (
            <>
              {photos.map(photo => (
                <PhotoProcedureCard
                  key={photo.id}
                  id={photo.id}
                  photo_url={photo.photo_url}
                  procedure={selectedService.name}
                />
              ))}
            </>
          )}
        </div>

        <div className="space-y-2 rounded-2xl bg-gradient-to-r from-pink-50 to-rose-50 p-4 text-center md:p-6">
          <h4 className="font-semibold text-pink-800 md:text-lg">✨ Sua transformação começa aqui</h4>
          <p className="text-sm text-pink-700 md:text-base">
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
