import { useState } from 'react';
import { Calendar, Clock } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

import { timeSlots } from '@/data/mockData';

interface DateTimeStepProps {
  onNext: (data: { date: string; time: string }) => void;
  onBack: () => void;
  initialData?: { date: string; time: string };
}

export default function DateTimeStep({ onNext, onBack, initialData }: DateTimeStepProps) {
  const [selectedDate, setSelectedDate] = useState(initialData?.date || '');
  const [selectedTime, setSelectedTime] = useState(initialData?.time || '');

  const handleNext = () => {
    if (selectedDate && selectedTime) {
      onNext({ date: selectedDate, time: selectedTime });
    }
  };

  // Generate next 14 days
  const generateDates = () => {
    const dates = [];
    const today = new Date();

    for (let i = 1; i <= 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push({
        value: date.toISOString().split('T')[0],
        display: date.toLocaleDateString('pt-BR', {
          weekday: 'short',
          day: '2-digit',
          month: 'short'
        })
      });
    }
    return dates;
  };

  const dates = generateDates();

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="p-8 border-0 shadow-lg rounded-2xl bg-white/80 backdrop-blur-sm">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-pink-100 to-rose-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Calendar className="w-8 h-8 text-pink-500" />
          </div>
          <p className="text-gray-600">
            Escolha o melhor dia e horário para seu atendimento
          </p>
        </div>

        <div className="space-y-6">
          {/* Date Selection */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-pink-500" />
              Selecione a data
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {dates.map((date) => (
                <button
                  key={date.value}
                  onClick={() => setSelectedDate(date.value)}
                  className={`p-3 rounded-xl text-center transition-all duration-300 ${
                    selectedDate === date.value
                      ? 'bg-gradient-to-br from-pink-500 to-rose-500 text-white shadow-lg'
                      : 'bg-gray-50 hover:bg-pink-50 text-gray-700 hover:text-pink-600'
                  }`}
                >
                  <div className="text-sm font-medium">{date.display}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Time Selection */}
          {selectedDate && (
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <Clock className="w-5 h-5 mr-2 text-pink-500" />
                Escolha o horário
              </h3>
              <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
                {timeSlots.map((slot) => (
                  <button
                    key={slot.time}
                    onClick={() => slot.available && setSelectedTime(slot.time)}
                    disabled={!slot.available}
                    className={`p-3 rounded-xl text-center transition-all duration-300 ${
                      selectedTime === slot.time
                        ? 'bg-gradient-to-br from-pink-500 to-rose-500 text-white shadow-lg'
                        : slot.available
                          ? 'bg-gray-50 hover:bg-pink-50 text-gray-700 hover:text-pink-600'
                          : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {slot.time}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-4 mt-8">
          <Button
            onClick={onBack}
            variant="outline"
            className="flex-1 !bg-transparent !hover:bg-transparent border-gray-300 text-gray-600 py-3 rounded-xl font-semibold hover:border-gray-400 transition-all duration-300"
          >
            Voltar
          </Button>
          <Button
            onClick={handleNext}
            disabled={!selectedDate || !selectedTime}
            className="flex-1 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continuar
          </Button>
        </div>
      </Card>
    </div>
  );
}