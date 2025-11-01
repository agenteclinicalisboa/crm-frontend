import type React from 'react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface Props {
  title: string;
  icon: React.ReactElement;
  children: React.ReactElement;
  canNext: boolean;
  help?: React.ReactElement;
  handleNext: () => void;
  onBack: () => void;
}

const Step = ({ title, icon, canNext, help, children, handleNext, onBack }: Props) => {
  return (
    <div className="mx-auto max-w-7xl">
      <Card className="space-y-4 rounded-2xl border-0 bg-white/80 p-6 shadow-lg backdrop-blur-sm">
        <div className="space-y-3 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-100 to-rose-100">
            {icon}
          </div>

          <p className="text-gray-600">{title}</p>
        </div>

        <div className="max-h-[49vh] overflow-auto">
          <div className="m-3 grid gap-6 md:grid-cols-2">{children}</div>
        </div>

        {help}

        <div className="flex gap-4">
          <Button
            className="!hover:bg-transparent flex-1 rounded-xl border-gray-300 !bg-transparent py-3 font-semibold text-gray-600 transition-all duration-300 hover:border-gray-400"
            variant="outline"
            onClick={onBack}
          >
            Voltar
          </Button>

          <Button
            className="flex-1 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:from-pink-600 hover:to-rose-600 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
            disabled={!canNext}
            onClick={handleNext}
          >
            Continuar
          </Button>
        </div>
      </Card>
    </div>
  );
};

export { Step };
