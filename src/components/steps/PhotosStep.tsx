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
    <div className="max-w-4xl mx-auto">
      <Card className="p-8 border-0 shadow-lg rounded-2xl bg-white/80 backdrop-blur-sm">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-pink-100 to-rose-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Image className="w-8 h-8 text-pink-500" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">
            Resultados que falam por si
          </h3>
          <p className="text-gray-600">
            Veja alguns dos nossos resultados antes de finalizar seu agendamento
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {beforeAfterPhotos.map((photo) => (
            <Card key={photo.id} className="p-6 border-0 shadow-md rounded-2xl bg-white">
              <div className="mb-4">
                <Badge variant="secondary" className="bg-pink-100 text-pink-700 hover:bg-pink-100 mb-4">
                  {photo.treatment}
                </Badge>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600 mb-2 text-center">Antes</p>
                  <div className="aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                    <img
                      src={photo.before}
                      alt="Antes do tratamento"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-center">
                  <ArrowRight className="w-6 h-6 text-pink-500" />
                </div>

                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600 mb-2 text-center">Depois</p>
                  <div className="aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-pink-100 to-rose-100">
                    <img
                      src={photo.after}
                      alt="Depois do tratamento"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="bg-gradient-to-r from-pink-50 to-rose-50 p-6 rounded-2xl mb-6 text-center">
          <h4 className="text-lg font-semibold text-pink-800 mb-2">
            ✨ Sua transformação começa aqui
          </h4>
          <p className="text-pink-700">
            Cada resultado é único e personalizado. Estamos ansiosos para
            ajudar você a alcançar seus objetivos de beleza e bem-estar.
          </p>
        </div>

        <div className="flex gap-4">
          <Button
            onClick={onBack}
            variant="outline"
            className="flex-1 !bg-transparent !hover:bg-transparent border-gray-300 text-gray-600 py-3 rounded-xl font-semibold hover:border-gray-400 transition-all duration-300"
          >
            Voltar
          </Button>
          <Button
            onClick={onNext}
            className="flex-1 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Finalizar agendamento
          </Button>
        </div>
      </Card>
    </div>
  );
}