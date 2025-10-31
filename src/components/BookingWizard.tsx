import React from 'react';

import StepIndicator from './StepIndicator';
import PhoneStep from './steps/PhoneStep';
import DateTimeStep from './steps/DateTimeStep';
import ServiceStep from './steps/ServiceStep';
import ProfessionalStep from './steps/ProfessionalStep';
import PhotosStep from './steps/PhotosStep';
import PaymentStep from './steps/PaymentStep';
import SuccessPage from './SuccessPage';

import { type Service, type Professional } from '@/data/mockData';

interface BookingData {
  phone: string;
  date: string;
  time: string;
  service: Service;
  professional: Professional;
}

type StepData =
  | { phone: string }
  | { date: string; time: string }
  | { service: Service }
  | { professional: Professional };

export default function BookingWizard() {
  const [currentStep, setCurrentStep] = React.useState(1);
  const [bookingData, setBookingData] = React.useState<Partial<BookingData> | BookingData | undefined>(undefined);
  const [isCompleted, setIsCompleted] = React.useState(false);

  const stepTitles = [
    'Seu contato',
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
            <ServiceStep
              onNext={handleNext}
              onBack={handleBack}
              initialData={{ service: bookingData?.service }}
            />
          )}

          {currentStep === 3 && (
            <ProfessionalStep
              onNext={handleNext}
              onBack={handleBack}
              initialData={{ professional: bookingData?.professional }}
            />
          )}

          {currentStep === 4 && (
            <DateTimeStep
              onNext={handleNext}
              onBack={handleBack}
              initialData={{
                date: bookingData?.date ?? '',
                time: bookingData?.time ?? '',
              }}
            />
          )}

          {currentStep === 5 && (
            <PhotosStep
              onNext={() => {
                setCurrentStep(6);
              }}
              onBack={handleBack}
            />
          )}

          {currentStep === 6 && (
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
