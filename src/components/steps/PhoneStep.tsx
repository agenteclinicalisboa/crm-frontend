import React from 'react';
import { PhoneIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';

import { useToast } from '@/app/core/hooks/useToast';
import { formatPhone, validatePhone } from '@/app/core/shared/utils';

import type { IBookingCreate } from '@/app/private/modules/client/booking/types/booking';

import { PatientsService } from '@/app/private/modules/admin/patients/services/patients';

interface PhoneStepProps {
  initialData: { patient?: IBookingCreate['patient'] };
  onNext: (data: { patient: IBookingCreate['patient'] }) => void;
}

const PhoneStep = ({ onNext, initialData }: PhoneStepProps) => {
  const { toast } = useToast();

  const [selected, setSelected] = React.useState<IBookingCreate['patient']>(
    initialData.patient ?? { id: 0, name: '', phone: '' }
  );

  const [register, setRegister] = React.useState(false);
  const [error, setError] = React.useState({ phone: '', name: '' });

  const handleNext = async () => {
    const verifyOrCreate = async (phone: string) => {
      if (register) {
        return await new PatientsService().create({
          name: selected.name,
          phone,
        });
      }

      return await new PatientsService().verify(phone);
    };

    if (!validatePhone(selected.phone)) {
      setError({
        name: '',
        phone: 'Por favor, insira um número de celular válido',
      });
      toast({ title: 'Por favor, insira um número de celular válido', type: 'error' });
      return;
    }

    const number = selected.phone.replace(/\D/g, '');
    const data = await verifyOrCreate(number);
    if (!data.data?.id) {
      setRegister(true);
      setError({
        name: 'Por favor, preencha o seu nome!',
        phone: '',
      });
      toast({ title: 'Por favor, preencha o seu nome!', type: 'warning' });
      return;
    }

    setSelected({
      id: data.data.id,
      name: data.data.name,
      phone: data.data.phone,
    });

    onNext({ patient: data.data });
  };

  return (
    <div className="mx-auto max-w-md">
      <Card className="rounded-2xl border-0 bg-white/80 p-8 shadow-lg backdrop-blur-sm">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-100 to-rose-100">
            <PhoneIcon className="h-8 w-8 text-pink-500" />
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
              className={`mt-2 rounded-xl border-2 px-4 py-3 text-lg ${
                error.phone ? 'border-red-300' : 'border-gray-200 focus:border-pink-300'
              }`}
              type="tel"
              value={selected.phone}
              onChange={e => {
                setSelected(prev => ({
                  ...prev,
                  phone: formatPhone(e.target.value),
                }));
              }}
              placeholder="(11) 99999-9999"
              maxLength={15}
            />
            {error.phone && <p className="mt-2 text-sm text-red-500">{error.phone}</p>}
          </div>

          <div className="rounded-xl bg-pink-50 p-4">
            <p className="text-sm text-pink-700">
              💡 <strong>Dica:</strong> Usaremos este número para enviar a confirmação do seu agendamento via WhatsApp.
            </p>
          </div>
        </div>

        {register && (
          <div className="space-y-4">
            <div>
              <Label
                htmlFor="name"
                className="font-medium text-gray-700"
              >
                Seu nome *
              </Label>
              <Input
                id="name"
                className={`mt-2 rounded-xl border-2 px-4 py-3 text-lg ${
                  error.name ? 'border-red-300' : 'border-gray-200 focus:border-pink-300'
                }`}
                value={selected.name}
                placeholder="Aline"
                minLength={3}
                maxLength={15}
                onChange={value => {
                  setSelected(prev => ({
                    ...prev,
                    name: value.target.value,
                  }));
                }}
              />
              {error.name && <p className="mt-2 text-sm text-red-500">{error.name}</p>}
            </div>
          </div>
        )}

        <Button
          className="mt-6 w-full rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 py-3 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:from-pink-600 hover:to-rose-600 hover:shadow-xl"
          disabled={!selected.phone || (register && !selected.name)}
          onClick={() => {
            void handleNext();
          }}
        >
          Continuar
        </Button>
      </Card>
    </div>
  );
};

export { PhoneStep };
