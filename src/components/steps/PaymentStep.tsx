import { useState } from 'react';
import { CreditCard, Calendar, Clock, User, Phone, CheckCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

import { currency, formatDate, formatDuration, formatTime } from '@/app/core/shared/utils';

import type { IBookingCreate } from '@/app/private/modules/client/booking/types/booking';

interface PaymentStepProps {
  bookingData: IBookingCreate;
  onConfirm: () => void;
  onBack: () => void;
}

const PaymentStep = ({ bookingData, onConfirm, onBack }: PaymentStepProps) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleConfirm = async () => {
    setIsProcessing(true);
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsProcessing(false);
    onConfirm();
  };

  return (
    <div className="mx-auto md:max-w-2xl">
      <Card className="space-y-4 rounded-2xl border-0 bg-white/80 p-6 shadow-lg backdrop-blur-sm md:p-8">
        <div className="space-y-2 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-100 to-rose-100 md:h-16 md:w-16">
            <CreditCard className="h-6 w-6 text-pink-500 md:h-8 md:w-8" />
          </div>
          <h3 className="text-xl font-bold text-gray-800 md:text-2xl">Resumo do agendamento</h3>
          <p className="text-gray-600">Confirme os detalhes antes de finalizar</p>
        </div>

        {/* Booking Summary */}
        <div className="space-y-6">
          <Card className="rounded-2xl border border-pink-200 bg-gradient-to-r from-pink-50 to-rose-50 p-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-pink-600" />
                <div>
                  <p className="text-sm text-gray-600">WhatsApp</p>
                  <p className="font-semibold text-gray-800">{bookingData.patient.phone}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-pink-600" />
                <div>
                  <p className="text-sm text-gray-600">Data</p>
                  <p className="font-semibold text-gray-800">{formatDate(`${bookingData.date}T10:00:00.000Z`)}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-pink-600" />
                <div>
                  <p className="text-sm text-gray-600">Horário</p>
                  <p className="font-semibold text-gray-800">{formatTime(bookingData.time)}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <User className="h-5 w-5 text-pink-600" />
                <div>
                  <p className="text-sm text-gray-600">Profissional</p>
                  <p className="font-semibold text-gray-800">{bookingData.professional.name}</p>
                  <p className="text-sm text-pink-600">{bookingData.professional.profession}</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Service Details */}
          <Card className="rounded-2xl border-0 bg-white p-6 shadow-md">
            <h4 className="mb-4 font-semibold text-gray-800">Detalhes do serviço</h4>
            <div className="mb-4 flex items-start justify-between">
              <div>
                <p className="font-semibold text-gray-800">{bookingData.service.name}</p>
                <Badge
                  variant="secondary"
                  className="mt-2 bg-pink-100 text-pink-700 hover:bg-pink-100"
                >
                  <Clock className="mr-1 h-3 w-3" />
                  {formatDuration(bookingData.service.duration)}
                </Badge>
              </div>

              <p className="text-2xl font-bold text-pink-600">{currency(bookingData.service.value)}</p>
            </div>

            <Separator className="my-4" />

            <div className="flex items-center justify-between">
              <p className="font-semibold text-gray-800">Total</p>
              <p className="text-2xl font-bold text-pink-600">{currency(bookingData.service.value)}</p>
            </div>
          </Card>
        </div>

        {/* Payment Method */}
        <Card className="rounded-2xl border-0 bg-white p-6 shadow-md">
          <h4 className="mb-4 font-semibold text-gray-800">Forma de pagamento</h4>
          <div className="rounded-xl border border-green-200 bg-green-50 p-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <div>
                <p className="font-medium text-green-800">Pagamento no local</p>
                <p className="text-sm text-green-600">Você pode pagar diretamente na clínica no dia do atendimento</p>
              </div>
            </div>
          </div>
        </Card>

        <div className="rounded-xl bg-pink-50 p-4">
          <p className="text-sm text-pink-700">
            💖 <strong>Quase lá!</strong> Ao confirmar, enviaremos todos os detalhes do seu agendamento via WhatsApp.
          </p>
        </div>

        <div className="flex gap-4">
          <Button
            className="!hover:bg-transparent flex-1 rounded-xl border-gray-300 !bg-transparent py-3 font-semibold text-gray-600 transition-all duration-300 hover:border-gray-400"
            variant="outline"
            disabled={isProcessing}
            onClick={onBack}
          >
            Voltar
          </Button>

          <Button
            className="flex-1 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:from-pink-600 hover:to-rose-600 hover:shadow-xl disabled:opacity-50"
            disabled={isProcessing}
            onClick={() => {
              void handleConfirm();
            }}
          >
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
              {isProcessing ? 'Confirmando...' : 'Confirmar agendamento'}
            </div>
          </Button>
        </div>
      </Card>
    </div>
  );
};

export { PaymentStep };
