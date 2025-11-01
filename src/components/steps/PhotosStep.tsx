import { Image, ArrowRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

import { beforeAfterPhotos } from '@/data/mockData';

interface PhotosStepProps {
  onNext: () => void;
  onBack: () => void;
}

export default function PhotosStep({ onNext, onBack }: PhotosStepProps) {
  return (
    <div className="mx-auto max-w-4xl">
      <Card className="rounded-2xl border-0 bg-white/80 p-8 shadow-lg backdrop-blur-sm">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-100 to-rose-100">
            <Image className="h-8 w-8 text-pink-500" />
          </div>
          <h3 className="mb-2 text-2xl font-bold text-gray-800">Resultados que falam por si</h3>
          <p className="text-gray-600">Veja alguns dos nossos resultados antes de finalizar seu agendamento</p>
        </div>

        <div className="mb-8 grid gap-8 md:grid-cols-2">
          {beforeAfterPhotos.map(photo => (
            <Card
              key={photo.id}
              className="rounded-2xl border-0 bg-white p-6 shadow-md"
            >
              <div className="mb-4">
                <Badge
                  variant="secondary"
                  className="mb-4 bg-pink-100 text-pink-700 hover:bg-pink-100"
                >
                  {photo.treatment}
                </Badge>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <p className="mb-2 text-center text-sm font-medium text-gray-600">Antes</p>
                  <div className="aspect-square overflow-hidden rounded-xl bg-gradient-to-br from-gray-100 to-gray-200">
                    <img
                      src={photo.before}
                      alt="Antes do tratamento"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-center">
                  <ArrowRight className="h-6 w-6 text-pink-500" />
                </div>

                <div className="flex-1">
                  <p className="mb-2 text-center text-sm font-medium text-gray-600">Depois</p>
                  <div className="aspect-square overflow-hidden rounded-xl bg-gradient-to-br from-pink-100 to-rose-100">
                    <img
                      src={photo.after}
                      alt="Depois do tratamento"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="mb-6 rounded-2xl bg-gradient-to-r from-pink-50 to-rose-50 p-6 text-center">
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
}
