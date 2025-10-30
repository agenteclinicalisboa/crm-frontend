import { useState } from 'react';
import { CreditCard, Calendar, Clock, User, Phone, CheckCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

interface BookingData {
  phone: string;
  date: string;
  time: string;
  service: {
    name: string;
    price: number;
    duration: string;
  };
  professional: {
    name: string;
    specialty: string;
  };
}

interface PaymentStepProps {
  bookingData: BookingData;
  onConfirm: () => void;
  onBack: () => void;
}

export default function PaymentStep({ bookingData, onConfirm, onBack }: PaymentStepProps) {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleConfirm = async () => {
    setIsProcessing(true);
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsProcessing(false);
    onConfirm();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="p-8 border-0 shadow-lg rounded-2xl bg-white/80 backdrop-blur-sm">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-pink-100 to-rose-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <CreditCard className="w-8 h-8 text-pink-500" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">
            Resumo do agendamento
          </h3>
          <p className="text-gray-600">
            Confirme os detalhes antes de finalizar
          </p>
        </div>

        {/* Booking Summary */}
        <div className="space-y-6 mb-8">
          <Card className="p-6 bg-gradient-to-r from-pink-50 to-rose-50 border border-pink-200 rounded-2xl">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-pink-600" />
                <div>
                  <p className="text-sm text-gray-600">WhatsApp</p>
                  <p className="font-semibold text-gray-800">{bookingData.phone}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-pink-600" />
                <div>
                  <p className="text-sm text-gray-600">Data</p>
                  <p className="font-semibold text-gray-800">{formatDate(bookingData.date)}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-pink-600" />
                <div>
                  <p className="text-sm text-gray-600">Horário</p>
                  <p className="font-semibold text-gray-800">{bookingData.time}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <User className="w-5 h-5 text-pink-600" />
                <div>
                  <p className="text-sm text-gray-600">Profissional</p>
                  <p className="font-semibold text-gray-800">{bookingData.professional.name}</p>
                  <p className="text-sm text-pink-600">{bookingData.professional.specialty}</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Service Details */}
          <Card className="p-6 border-0 shadow-md rounded-2xl bg-white">
            <h4 className="font-semibold text-gray-800 mb-4">Detalhes do serviço</h4>
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="font-semibold text-gray-800">{bookingData.service.name}</p>
                <Badge variant="secondary" className="bg-pink-100 text-pink-700 hover:bg-pink-100 mt-2">
                  <Clock className="w-3 h-3 mr-1" />
                  {bookingData.service.duration}
                </Badge>
              </div>
              <p className="text-2xl font-bold text-pink-600">€{bookingData.service.price}</p>
            </div>

            <Separator className="my-4" />

            <div className="flex justify-between items-center">
              <p className="font-semibold text-gray-800">Total</p>
              <p className="text-2xl font-bold text-pink-600">€{bookingData.service.price}</p>
            </div>
          </Card>
        </div>

        {/* Payment Method */}
        <Card className="p-6 border-0 shadow-md rounded-2xl bg-white mb-6">
          <h4 className="font-semibold text-gray-800 mb-4">Forma de pagamento</h4>
          <div className="bg-green-50 p-4 rounded-xl border border-green-200">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <div>
                <p className="font-medium text-green-800">Pagamento no local</p>
                <p className="text-sm text-green-600">
                  Você pode pagar diretamente na clínica no dia do atendimento
                </p>
              </div>
            </div>
          </div>
        </Card>

        <div className="bg-pink-50 p-4 rounded-xl mb-6">
          <p className="text-sm text-pink-700">
            💖 <strong>Quase lá!</strong> Ao confirmar, enviaremos todos os detalhes
            do seu agendamento via WhatsApp.
          </p>
        </div>

        <div className="flex gap-4">
          <Button
            onClick={onBack}
            variant="outline"
            disabled={isProcessing}
            className="flex-1 !bg-transparent !hover:bg-transparent border-gray-300 text-gray-600 py-3 rounded-xl font-semibold hover:border-gray-400 transition-all duration-300"
          >
            Voltar
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={isProcessing}
            className="flex-1 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
          >
            {isProcessing ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Confirmando...
              </div>
            ) : (
              'Confirmar agendamento'
            )}
          </Button>
        </div>
      </Card>
    </div>
  );
}