import { useState } from 'react';
import { Clock, DollarSign } from 'lucide-react';

import { services, type Service } from '@/data/mockData';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ServiceStepProps {
  onNext: (data: { service: Service }) => void;
  onBack: () => void;
  initialData?: { service: Service };
}

export default function ServiceStep({ onNext, onBack, initialData }: ServiceStepProps) {
  const [selectedService, setSelectedService] = useState<Service | null>(initialData?.service || null);

  const handleNext = () => {
    if (selectedService) {
      onNext({ service: selectedService });
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="p-8 border-0 shadow-lg rounded-2xl bg-white/80 backdrop-blur-sm">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-pink-100 to-rose-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <DollarSign className="w-8 h-8 text-pink-500" />
          </div>
          <p className="text-gray-600">
            Escolha o tratamento ideal para você
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {services.map((service) => (
            <div
              key={service.id}
              onClick={() => setSelectedService(service)}
              className={`cursor-pointer transition-all duration-300 ${
                selectedService?.id === service.id
                  ? 'ring-2 ring-pink-400 ring-offset-2'
                  : ''
              }`}
            >
              <Card className="p-6 h-full hover:shadow-xl transition-all duration-300 rounded-2xl border-0 shadow-md bg-white">
                <div className="aspect-video mb-4 rounded-xl overflow-hidden bg-gradient-to-br from-pink-100 to-rose-100">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-gray-800">
                    {service.name}
                  </h3>

                  <p className="text-gray-600 text-sm leading-relaxed">
                    {service.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Badge variant="secondary" className="bg-pink-100 text-pink-700 hover:bg-pink-100">
                        <Clock className="w-3 h-3 mr-1" />
                        {service.duration}
                      </Badge>
                    </div>

                    <div className="text-right">
                      <p className="text-2xl font-bold text-pink-600">
                        €{service.price}
                      </p>
                    </div>
                  </div>
                </div>

                {selectedService?.id === service.id && (
                  <div className="mt-4 p-3 bg-gradient-to-r from-pink-50 to-rose-50 rounded-xl border border-pink-200">
                    <p className="text-sm text-pink-700 font-medium text-center">
                      ✨ Tratamento selecionado
                    </p>
                  </div>
                )}
              </Card>
            </div>
          ))}
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
            onClick={handleNext}
            disabled={!selectedService}
            className="flex-1 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continuar
          </Button>
        </div>
      </Card>
    </div>
  );
}