import { useState } from 'react';

import { Star, User } from 'lucide-react';
import { professionals, type Professional } from '@/data/mockData';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface ProfessionalStepProps {
  onNext: (data: { professional: Professional }) => void;
  onBack: () => void;
  initialData?: { professional: Professional };
}

export default function ProfessionalStep({ onNext, onBack, initialData }: ProfessionalStepProps) {
  const [selectedProfessional, setSelectedProfessional] = useState<Professional | null>(
    initialData?.professional || null
  );

  const handleNext = () => {
    if (selectedProfessional) {
      onNext({ professional: selectedProfessional });
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <Card className="p-8 border-0 shadow-lg rounded-2xl bg-white/80 backdrop-blur-sm">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-pink-100 to-rose-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-pink-500" />
          </div>
          <p className="text-gray-600">
            Escolha o profissional para seu atendimento
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {professionals.map((professional) => (
            <div
              key={professional.id}
              onClick={() => setSelectedProfessional(professional)}
              className={`cursor-pointer transition-all duration-300 ${
                selectedProfessional?.id === professional.id
                  ? 'ring-2 ring-pink-400 ring-offset-2'
                  : ''
              }`}
            >
              <Card className="p-6 h-full hover:shadow-xl transition-all duration-300 rounded-2xl border-0 shadow-md bg-white text-center">
                <div className="mb-4">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden bg-gradient-to-br from-pink-100 to-rose-100">
                    <img
                      src={professional.image}
                      alt={professional.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {professional.name}
                  </h3>

                  <p className="text-gray-600 text-sm mb-3">
                    {professional.specialty}
                  </p>

                  <div className="flex items-center justify-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium text-gray-700">
                      {professional.rating}
                    </span>
                  </div>
                </div>

                {selectedProfessional?.id === professional.id && (
                  <div className="mt-4 p-3 bg-gradient-to-r from-pink-50 to-rose-50 rounded-xl border border-pink-200">
                    <p className="text-sm text-pink-700 font-medium">
                      ✨ Profissional selecionado
                    </p>
                  </div>
                )}
              </Card>
            </div>
          ))}
        </div>

        <div className="bg-pink-50 p-4 rounded-xl mb-6">
          <p className="text-sm text-pink-700">
            💡 <strong>Dica:</strong> Todos os nossos profissionais são qualificados e
            experientes. Você pode escolher qualquer um com confiança!
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
            onClick={handleNext}
            disabled={!selectedProfessional}
            className="flex-1 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continuar
          </Button>
        </div>
      </Card>
    </div>
  );
}