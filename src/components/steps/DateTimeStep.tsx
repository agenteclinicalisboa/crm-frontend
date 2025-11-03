import React from 'react';
import { CalendarIcon, ClockIcon } from 'lucide-react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { Step } from '@/components/steps';
import { DateCard, DateCardSkeleton } from '@/components/DateCard';
import { DateTimeCard } from '@/components/DateTimeCard';

import { useToast } from '@/app/core/hooks/useToast';

import type { IBookingCreate } from '@/app/private/modules/client/booking/types/booking';
import { BookingService } from '@/app/private/modules/client/booking/services/bookings';

import type { IListProfessionalFreeDays } from '@/app/private/modules/admin/professionals/types/professionals';
import { ProfessionalsService } from '@/app/private/modules/admin/professionals/services/professionals';

interface DateTimeStepProps {
  initialData: {
    patient: IBookingCreate['patient'];
    service: IBookingCreate['service'];
    professional: IBookingCreate['professional'];
    date?: string;
    time?: string;
  };
  onNext: (data: { date: string; time: string }) => void;
  onBack: () => void;
}

const DateTimeStep = ({ onNext, onBack, initialData }: DateTimeStepProps) => {
  const { toast } = useToast();

  const [selectedPatient] = React.useState<IBookingCreate['patient']>(initialData.patient);
  const [selectedService] = React.useState<IBookingCreate['service']>(initialData.service);
  const [selectedProfessional] = React.useState<IBookingCreate['professional']>(initialData.professional);
  const [selectedDate, setSelectedDate] = React.useState(initialData.date ?? '');
  const [selectedTime, setSelectedTime] = React.useState(initialData.time ?? '');

  // TODO: Verificar horário de atendimento, 12hrs, 21hrs, almoço, encerramento
  const queryProfessionalFreeDays = useQuery<IListProfessionalFreeDays[]>({
    placeholderData: keepPreviousData,
    queryKey: ['ProfessionalFreeDays', selectedProfessional.id, selectedService.id],
    queryFn: async () => {
      const { data, error } = await new ProfessionalsService().freeDays(selectedProfessional.id, selectedService.id);
      if (error) {
        return [];
      }

      return data ?? [];
    },
  });

  const professionalFreeDays = React.useMemo(() => {
    const items = Array.isArray(queryProfessionalFreeDays.data) ? queryProfessionalFreeDays.data : [];
    return items;
  }, [queryProfessionalFreeDays.data]);

  const professionalFreeDayTimes = React.useMemo(() => {
    const date = professionalFreeDays.find(item => item.value === selectedDate);
    const items = Array.isArray(date?.times) ? date.times : [];
    return items;
  }, [professionalFreeDays, selectedDate]);

  const handleNext = async () => {
    if (!selectedDate || !selectedTime) {
      toast({ title: 'Verifique a seleção de data e horário', type: 'warning' });
      return;
    }

    const next = await new BookingService().availability(selectedProfessional.id, {
      patient_id: selectedPatient.id,
      procedure_id: selectedService.id,
      date: selectedDate,
      time_start: new Date(selectedTime).toLocaleTimeString('pt-BR'),
    });
    if (next.error || !next.data) {
      toast({ title: 'Parece que o horário já foi reservado!', type: 'error' });
      return;
    }

    onNext({ date: selectedDate, time: selectedTime });
  };

  return (
    <Step
      title="Escolha o melhor dia e horário para seu atendimento"
      icon={<CalendarIcon className="h-6 w-6 text-pink-500" />}
      canNext={!!selectedDate && !!selectedTime}
      handleNext={() => {
        void handleNext();
      }}
      onBack={onBack}
    >
      <div className="flex justify-evenly py-4">
        {/* Date Selection */}
        <div className="space-y-4">
          <h3 className="flex items-center text-lg font-semibold text-gray-800">
            <CalendarIcon className="mr-2 h-5 w-5 text-pink-500" />
            Selecione a data
          </h3>

          <div className="grid gap-6 md:grid-cols-3">
            {queryProfessionalFreeDays.isLoading ? (
              <>
                {Array(9)
                  .fill('')
                  .map((_, idx) => (
                    <DateCardSkeleton key={`date_${String(idx)}`} />
                  ))}
              </>
            ) : (
              <>
                {professionalFreeDays.map(item => (
                  <DateCard
                    key={item.value}
                    item={item}
                    selected={selectedDate}
                    onSelect={() => {
                      setSelectedDate(item.value);
                      setSelectedTime('');
                    }}
                  />
                ))}
              </>
            )}
          </div>
        </div>

        {/* Time Selection */}
        {selectedDate && (
          <div className="space-y-4">
            <h3 className="flex items-center text-lg font-semibold text-gray-800">
              <ClockIcon className="mr-2 h-5 w-5 text-pink-500" />
              Escolha o horário
            </h3>

            <div className="grid gap-6 md:grid-cols-6">
              {professionalFreeDayTimes.map(item => (
                <DateTimeCard
                  key={item.time}
                  item={item}
                  selected={selectedTime}
                  onSelect={() => {
                    setSelectedTime(item.time);
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </Step>
  );
};

export { DateTimeStep };
