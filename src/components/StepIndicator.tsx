import { CheckIcon } from 'lucide-react';

interface Props {
  currentStep: number;
  totalSteps: number;
  stepTitles: string[];
}

const StepIndicator = ({ currentStep, totalSteps, stepTitles }: Props) => {
  return (
    <div className="w-full space-y-4">
      <div className="flex items-center justify-between">
        {Array.from({ length: totalSteps }, (_, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;

          return (
            <div
              key={stepNumber}
              className="flex items-center"
            >
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold transition-all duration-300 ${
                  isCompleted
                    ? 'bg-gradient-to-br from-pink-500 to-rose-500 text-white shadow-lg'
                    : isCurrent
                      ? 'border-2 border-pink-300 bg-gradient-to-br from-pink-100 to-rose-100 text-pink-600'
                      : 'bg-gray-100 text-gray-400'
                } `}
              >
                {isCompleted ? <CheckIcon className="h-5 w-5" /> : stepNumber}
              </div>

              {index < totalSteps - 1 && (
                <div
                  className={`mx-2 h-1 w-12 rounded-full transition-all duration-300 ${isCompleted ? 'bg-gradient-to-r from-pink-500 to-rose-500' : 'bg-gray-200'} `}
                />
              )}
            </div>
          );
        })}
      </div>

      <div className="space-y-2 text-center">
        <h2 className="text-2xl font-bold text-gray-800">{stepTitles[currentStep - 1]}</h2>
        <p className="text-gray-500">
          Passo {currentStep} de {totalSteps}
        </p>
      </div>
    </div>
  );
};

export { StepIndicator };
