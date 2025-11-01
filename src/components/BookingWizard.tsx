import React from 'react';

import SuccessPage from './SuccessPage';
import StepIndicator from './StepIndicator';
import PhoneStep from './steps/PhoneStep';
import DateTimeStep from './steps/DateTimeStep';
import ServiceStep from './steps/ServiceStep';
import ProfessionalStep from './steps/ProfessionalStep';
import PhotosStep from './steps/PhotosStep';
import PaymentStep from './steps/PaymentStep';
import CategoryStep from './steps/CategoryStep';

import type { IProfessional } from '@/app/private/modules/admin/professionals/types/professionals';
import type { IProcedure, IProcedureCategory } from '@/app/private/modules/admin/procedures/types/procedures';

interface BookingData {
  phone: string;
  date: string;
  time: string;
  category: IProcedureCategory;
  service: IProcedure;
  professional: IProfessional;
}

type StepData =
  | { phone: string }
  | { date: string; time: string }
  | { category: IProcedureCategory }
  | { service: IProcedure }
  | { professional: IProfessional };

export default function BookingWizard() {
  const [currentStep, setCurrentStep] = React.useState(1);
  const [bookingData, setBookingData] = React.useState<Partial<BookingData> | BookingData | undefined>(undefined);
  const [isCompleted, setIsCompleted] = React.useState(false);

  const stepTitles = [
    'Seu contato',
    'Escolha do tipo do tratamento',
    'Escolha do tratamento',
    'Profissional',
    'Data e horário',
    'Nossos resultados',
    'Confirmação',
  ];

  const handleNext = (stepData: StepData) => {
    setBookingData(prev => ({ ...prev, ...(stepData as BookingData) }));
    setCurrentStep(prev => prev + 1);
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleConfirm = () => {
    setIsCompleted(true);
  };

  if (isCompleted) {
    return <SuccessPage bookingData={bookingData as BookingData} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50 py-8">
      <div className="container mx-auto px-6">
        <StepIndicator
          currentStep={currentStep}
          totalSteps={6}
          stepTitles={stepTitles}
        />

        <div className="mt-8">
          {currentStep === 1 && (
            <PhoneStep
              onNext={handleNext}
              initialData={{ phone: bookingData?.phone ?? '' }}
            />
          )}

          {currentStep === 2 && (
            <CategoryStep
              onNext={handleNext}
              onBack={handleBack}
              initialData={{ category: bookingData?.category }}
            />
          )}

          {currentStep === 3 && (
            <ServiceStep
              onNext={handleNext}
              onBack={handleBack}
              initialData={{
                category: bookingData?.category as unknown as IProcedureCategory,
                service: bookingData?.service,
              }}
            />
          )}

          {currentStep === 4 && (
            <ProfessionalStep
              onNext={handleNext}
              onBack={handleBack}
              initialData={{ professional: bookingData?.professional }}
            />
          )}

          {currentStep === 5 && (
            <DateTimeStep
              onNext={handleNext}
              onBack={handleBack}
              initialData={{
                date: bookingData?.date ?? '',
                time: bookingData?.time ?? '',
              }}
            />
          )}

          {currentStep === 6 && (
            <PhotosStep
              onNext={() => {
                setCurrentStep(7);
              }}
              onBack={handleBack}
            />
          )}

          {currentStep === 7 && (
            <PaymentStep
              bookingData={bookingData as BookingData}
              onConfirm={handleConfirm}
              onBack={handleBack}
            />
          )}
        </div>
      </div>
    </div>
  );
}
