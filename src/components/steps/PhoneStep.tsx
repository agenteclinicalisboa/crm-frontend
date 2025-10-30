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
    <div className="max-w-md mx-auto">
      <Card className="p-8 border-0 shadow-lg rounded-2xl bg-white/80 backdrop-blur-sm">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-pink-100 to-rose-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Phone className="w-8 h-8 text-pink-500" />
          </div>
          <p className="text-gray-600">
            Vamos começar com seu número de WhatsApp para confirmar o agendamento
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="phone" className="text-gray-700 font-medium">
              Número do WhatsApp *
            </Label>
            <Input
              id="phone"
              type="tel"
              placeholder="(11) 99999-9999"
              value={phone}
              onChange={handlePhoneChange}
              className={`mt-2 rounded-xl border-2 py-3 px-4 text-lg ${
                error ? 'border-red-300' : 'border-gray-200 focus:border-pink-300'
              }`}
              maxLength={15}
            />
            {error && (
              <p className="text-red-500 text-sm mt-2">{error}</p>
            )}
          </div>

          <div className="bg-pink-50 p-4 rounded-xl">
            <p className="text-sm text-pink-700">
              💡 <strong>Dica:</strong> Usaremos este número para enviar a confirmação
              do seu agendamento via WhatsApp.
            </p>
          </div>
        </div>

        <Button
          onClick={handleNext}
          className="w-full mt-6 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white py-3 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
        >
          Continuar
        </Button>
      </Card>
    </div>
  );
}