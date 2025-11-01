import React, { useState } from 'react';
import { UserIcon } from 'lucide-react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { Step } from '@/components/steps';
import { ProfessionalCard, ProfessionalCardSkeleton } from '@/components/ProfessionalCard';

import type { IBookingCreate } from '@/app/private/modules/client/booking/types/booking';

import type { IListProfessional } from '@/app/private/modules/admin/professionals/types/professionals';
import { ProfessionalsService } from '@/app/private/modules/admin/professionals/services/professionals';

import { ProceduresService } from '@/app/private/modules/admin/procedures/services/procedures';
import type { IProfessionalsProcedure } from '@/app/private/modules/admin/procedures/types/procedures';

interface ProfessionalStepProps {
  initialData: {
    service: IBookingCreate['service'];
    professional?: IBookingCreate['professional'];
  };
  onNext: (data: { professional: IBookingCreate['professional'] }) => void;
  onBack: () => void;
}

const ProfessionalStep = ({ onNext, onBack, initialData }: ProfessionalStepProps) => {
  const [selectedService] = React.useState<IBookingCreate['service']>(initialData.service);
  const [selected, setSelected] = useState<IBookingCreate['professional'] | undefined>(initialData.professional);

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

  const queryProfessionalsProcedure = useQuery<IProfessionalsProcedure>({
    placeholderData: keepPreviousData,
    queryKey: ['ProfessionalsProcedure', selectedService.name],
    queryFn: async () => {
      const { data, error } = await new ProceduresService().professionals(selectedService.id);
      if (error) {
        return { id: selectedService.id, professionals: [] };
      }

      return data ?? { id: selectedService.id, professionals: [] };
    },
  });

  const professionals = React.useMemo(() => {
    const professionals = Array.isArray(queryProfessionals.data) ? queryProfessionals.data : [];

    const ids = Array.isArray(queryProfessionalsProcedure.data?.professionals)
      ? queryProfessionalsProcedure.data.professionals
      : [];
    if (ids.length === 0) {
      return professionals;
    }

    return ids
      .map(item => {
        const professional = professionals.find(it => it.id == item);
        return professional;
      })
      .filter(item => !!item?.id) as IListProfessional[];
  }, [queryProfessionals.data, queryProfessionalsProcedure.data?.professionals]);

  const handleNext = () => {
    if (selected) {
      onNext({ professional: selected });
    }
  };

  return (
    <Step
      title="Selecione o profissional de sua preferência"
      icon={<UserIcon className="h-6 w-6 text-pink-500" />}
      help={
        <div className="mb-6 rounded-xl bg-pink-50 p-4">
          <p className="text-sm text-pink-700">
            💡 <strong>Dica:</strong> Todos os nossos profissionais são qualificados e experientes. Você pode escolher
            com confiança!
          </p>
        </div>
      }
      canNext={!!selected}
      handleNext={handleNext}
      onBack={onBack}
    >
      {queryProfessionals.isLoading || queryProfessionalsProcedure.isLoading ? (
        <>
          {Array(4)
            .fill('')
            .map((_, idx) => (
              <ProfessionalCardSkeleton key={`professional_procedure_${String(idx)}`} />
            ))}
        </>
      ) : (
        <>
          {professionals.map(item => (
            <ProfessionalCard
              key={item.id}
              item={item}
              selected={selected}
              onSelect={() => {
                setSelected(item);
              }}
            />
          ))}
        </>
      )}
    </Step>
  );
};

export { ProfessionalStep };
