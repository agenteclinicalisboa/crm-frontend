import React from 'react';

import {SuccessPage} from './SuccessPage';
import {StepIndicator} from './StepIndicator';
import { PhoneStep } from './steps/PhoneStep';
import { DateTimeStep } from './steps/DateTimeStep';
import { ServiceStep } from './steps/ServiceStep';
import { SubServiceStep } from './steps/SubServiceStep';
import { ProfessionalStep } from './steps/ProfessionalStep';
import { PhotosStep } from './steps/PhotosStep';
import { PaymentStep } from './steps/PaymentStep';
import { CategoryStep } from './steps/CategoryStep';

import type { IBookingCreate } from '@/app/private/modules/client/booking/types/booking';

const stepTitles = [
  'Seu contato',
  'Escolha do tipo do tratamento',
  'Escolha do tratamento',
  'Escolha da área do tratamento',
  'Profissional',
  'Data e horário',
  'Nossos resultados',
  'Confirmação',
];

type StepData =
  | { phone: string }
  | { date: string; time: string }
  | { category: IBookingCreate['category'] }
  | { service: IBookingCreate['service'] }
  | { subService?: IBookingCreate['subService'] }
  | { professional: IBookingCreate['professional'] };

export default function BookingWizard() {
  const [currentStep, setCurrentStep] = React.useState(1);
  const [bookingData, setBookingData] = React.useState<Partial<IBookingCreate> | IBookingCreate | undefined>(undefined);
  const [isCompleted, setIsCompleted] = React.useState(false);

  const handleNext = (stepData: StepData) => {
    setBookingData(prev => ({ ...prev, ...(stepData as IBookingCreate) }));
    setCurrentStep(prev => prev + 1);
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleConfirm = () => {
    setIsCompleted(true);
  };

  if (isCompleted) {
    return <SuccessPage bookingData={bookingData as IBookingCreate} />;
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

          {/* TODO: Avaliação */}
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
                category: bookingData?.category as unknown as IBookingCreate['category'],
                service: bookingData?.service,
              }}
            />
          )}

          {currentStep === 4 && (
            <SubServiceStep
              initialData={{
                service: bookingData?.service as unknown as IBookingCreate['service'],
                subService: bookingData?.subService,
              }}
              onNext={handleNext}
              onBack={handleBack}
            />
          )}

          {currentStep === 5 && (
            <ProfessionalStep
              onNext={handleNext}
              onBack={handleBack}
              initialData={{
                service: (bookingData?.subService ?? bookingData?.service) as unknown as IBookingCreate['service'],
                professional: bookingData?.professional,
              }}
            />
          )}

          {currentStep === 6 && (
            <DateTimeStep
              onNext={handleNext}
              onBack={handleBack}
              initialData={{
                date: bookingData?.date ?? '',
                time: bookingData?.time ?? '',
              }}
            />
          )}

          {currentStep === 7 && (
            <PhotosStep
              onNext={() => {
                setCurrentStep(8);
              }}
              onBack={handleBack}
            />
          )}

          {currentStep === 8 && (
            <PaymentStep
              bookingData={bookingData as IBookingCreate}
              onConfirm={handleConfirm}
              onBack={handleBack}
            />
          )}
        </div>
      </div>
    </div>
  );
}
