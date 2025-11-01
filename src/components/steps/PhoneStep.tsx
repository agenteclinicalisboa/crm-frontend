import { useState } from 'react';
import { Phone } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';

interface PhoneStepProps {
  onNext: (data: { phone: string }) => void;
  initialData?: { phone: string };
}

export default function PhoneStep({ onNext, initialData }: PhoneStepProps) {
  const [phone, setPhone] = useState(initialData?.phone || '');
  const [error, setError] = useState('');

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 11) {
      return numbers.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }
    return value;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    setPhone(formatted);
    setError('');
  };

  const validatePhone = (phoneNumber: string) => {
    const numbers = phoneNumber.replace(/\D/g, '');
    return numbers.length === 11;
  };

  const handleNext = () => {
    if (!validatePhone(phone)) {
      setError('Por favor, insira um número de celular válido');
      return;
    }
    onNext({ phone });
  };

  return (
    <div className="mx-auto max-w-md">
      <Card className="rounded-2xl border-0 bg-white/80 p-8 shadow-lg backdrop-blur-sm">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-100 to-rose-100">
            <Phone className="h-8 w-8 text-pink-500" />
          </div>
          <p className="text-gray-600">Vamos começar com seu número de WhatsApp para confirmar o agendamento</p>
        </div>

        <div className="space-y-4">
          <div>
            <Label
              htmlFor="phone"
              className="font-medium text-gray-700"
            >
              Número do WhatsApp *
            </Label>
            <Input
              id="phone"
              type="tel"
              placeholder="(11) 99999-9999"
              value={phone}
              onChange={handlePhoneChange}
              className={`mt-2 rounded-xl border-2 px-4 py-3 text-lg ${
                error ? 'border-red-300' : 'border-gray-200 focus:border-pink-300'
              }`}
              maxLength={15}
            />
            {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
          </div>

          <div className="rounded-xl bg-pink-50 p-4">
            <p className="text-sm text-pink-700">
              💡 <strong>Dica:</strong> Usaremos este número para enviar a confirmação do seu agendamento via WhatsApp.
            </p>
          </div>
        </div>

        <Button
          className="mt-6 w-full rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 py-3 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:from-pink-600 hover:to-rose-600 hover:shadow-xl"
          onClick={handleNext}
        >
          Continuar
        </Button>
      </Card>
    </div>
  );
}
