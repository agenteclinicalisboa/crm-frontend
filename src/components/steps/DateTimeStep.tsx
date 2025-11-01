import React from 'react';
import { Calendar, Clock } from 'lucide-react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

import { getNextAvailableDays } from '@/app/core/shared/utils';
import { timeSlots } from '@/data/mockData';

import type { IListBusinessHour } from '@/app/private/modules/admin/settings/types/settings';
import { SettingsService } from '@/app/private/modules/admin/settings/services/settings';

interface DateTimeStepProps {
  initialData?: { date: string; time: string };
  onNext: (data: { date: string; time: string }) => void;
  onBack: () => void;
}

const DateTimeStep = ({ onNext, onBack, initialData }: DateTimeStepProps) => {
  const [selectedDate, setSelectedDate] = React.useState(initialData?.date ?? '');
  const [selectedTime, setSelectedTime] = React.useState(initialData?.time ?? '');

  const queryBusinessHour = useQuery<IListBusinessHour[]>({
    placeholderData: keepPreviousData,
    queryKey: ['BusinessHour'],
    queryFn: async () => {
      const { data, error } = await new SettingsService().businessHoursList();
      if (error) {
        return [];
      }

      return data ?? [];
    },
  });

  const businessHours = React.useMemo(() => {
    const items = Array.isArray(queryBusinessHour.data) ? queryBusinessHour.data : [];

    return getNextAvailableDays(items);
  }, [queryBusinessHour.data]);

  const handleNext = () => {
    if (selectedDate && selectedTime) {
      onNext({ date: selectedDate, time: selectedTime });
    }
  };

  return (
    <div className="mx-auto max-w-2xl">
      <Card className="rounded-2xl border-0 bg-white/80 p-8 shadow-lg backdrop-blur-sm">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-100 to-rose-100">
            <Calendar className="h-8 w-8 text-pink-500" />
          </div>
          <p className="text-gray-600">Escolha o melhor dia e horário para seu atendimento</p>
        </div>

        <div className="space-y-6">
          {/* Date Selection */}
          <div>
            <h3 className="mb-4 flex items-center text-lg font-semibold text-gray-800">
              <Calendar className="mr-2 h-5 w-5 text-pink-500" />
              Selecione a data
            </h3>

            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              {businessHours.map(date => (
                <button
                  key={date.value}
                  className={`rounded-xl p-3 text-center transition-all duration-300 ${
                    selectedDate === date.value
                      ? 'bg-gradient-to-br from-pink-500 to-rose-500 text-white shadow-lg'
                      : 'bg-gray-50 text-gray-700 hover:bg-pink-50 hover:text-pink-600'
                  }`}
                  onClick={() => {
                    setSelectedDate(date.value);
                  }}
                >
                  <div className="text-sm font-medium">{date.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Time Selection */}
          {selectedDate && (
            <div>
              <h3 className="mb-4 flex items-center text-lg font-semibold text-gray-800">
                <Clock className="mr-2 h-5 w-5 text-pink-500" />
                Escolha o horário
              </h3>

              <div className="grid grid-cols-3 gap-3 md:grid-cols-5">
                {timeSlots.map(slot => (
                  <button
                    key={slot.time}
                    className={`rounded-xl p-3 text-center transition-all duration-300 ${
                      selectedTime === slot.time
                        ? 'bg-gradient-to-br from-pink-500 to-rose-500 text-white shadow-lg'
                        : slot.available
                          ? 'bg-gray-50 text-gray-700 hover:bg-pink-50 hover:text-pink-600'
                          : 'cursor-not-allowed bg-gray-100 text-gray-400'
                    }`}
                    disabled={!slot.available}
                    onClick={() => {
                      setSelectedTime(slot.time);
                    }}
                  >
                    {slot.time}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="mt-8 flex gap-4">
          <Button
            className="!hover:bg-transparent flex-1 rounded-xl border-gray-300 !bg-transparent py-3 font-semibold text-gray-600 transition-all duration-300 hover:border-gray-400"
            variant="outline"
            onClick={onBack}
          >
            Voltar
          </Button>

          <Button
            className="flex-1 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:from-pink-600 hover:to-rose-600 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
            disabled={!selectedDate || !selectedTime}
            onClick={handleNext}
          >
            Continuar
          </Button>
        </div>
      </Card>
    </div>
  );
};

export { DateTimeStep };
