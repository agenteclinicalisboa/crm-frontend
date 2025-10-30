import { Check } from 'lucide-react';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  stepTitles: string[];
}

export default function StepIndicator({ currentStep, totalSteps, stepTitles }: StepIndicatorProps) {
  return (
    <div className="w-full mb-8">
      <div className="flex items-center justify-between mb-4">
        {Array.from({ length: totalSteps }, (_, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;

          return (
            <div key={stepNumber} className="flex items-center">
              <div className={`
                w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300
                ${isCompleted
                  ? 'bg-gradient-to-br from-pink-500 to-rose-500 text-white shadow-lg'
                  : isCurrent
                    ? 'bg-gradient-to-br from-pink-100 to-rose-100 text-pink-600 border-2 border-pink-300'
                    : 'bg-gray-100 text-gray-400'
                }
              `}>
                {isCompleted ? (
                  <Check className="w-5 h-5" />
                ) : (
                  stepNumber
                )}
              </div>

              {index < totalSteps - 1 && (
                <div className={`
                  w-12 h-1 mx-2 rounded-full transition-all duration-300
                  ${isCompleted ? 'bg-gradient-to-r from-pink-500 to-rose-500' : 'bg-gray-200'}
                `} />
              )}
            </div>
          );
        })}
      </div>

      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          {stepTitles[currentStep - 1]}
        </h2>
        <p className="text-gray-500">
          Passo {currentStep} de {totalSteps}
        </p>
      </div>
    </div>
  );
}