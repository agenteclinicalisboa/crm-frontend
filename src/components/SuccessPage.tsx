import { useNavigate } from 'react-router-dom';
import { CheckCircle, Calendar, Clock, User, Phone, Home, MessageCircle } from 'lucide-react';

import { env } from '@/env';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

import { currency, formatDate, formatDuration, formatTime } from '@/app/core/shared/utils';

import type { IBookingCreate } from '@/app/private/modules/client/booking/types/booking';

interface Props {
  bookingData: IBookingCreate;
}

const SuccessPage = ({ bookingData }: Props) => {
  const navigate = useNavigate();

  const generateBookingId = () => {
    return 'LBC' + Math.random().toString(36).substring(2, 9).toUpperCase();
  };

  const toggleCallWhatsapp = () => {
    const number = env.contact.phone.replace(/\D/g, '');
    const text = `Olá! Acabei de fazer um agendamento (ID: ${bookingId}) e gostaria de confirmar os detalhes.`;

    window.open(`https://wa.me/${number}?text=${text}`, '_blank');
  };

  const bookingId = generateBookingId();

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50 py-8">
      <div className="mx-auto px-6">
        <div className="mx-auto space-y-6 md:max-w-2xl">
          {/* Success Header */}
          <div className="text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-emerald-500 shadow-lg">
              <CheckCircle className="h-10 w-10 text-white" />
            </div>
            <h1 className="mb-4 text-3xl font-bold text-gray-800">Agendamento confirmado! 🎉</h1>
            <p className="text-xl text-gray-600">Seu momento de cuidado está agendado 💖</p>
          </div>

          {/* Booking Details */}
          <Card className="space-y-6 rounded-2xl border-0 bg-white/80 p-4 shadow-lg backdrop-blur-sm md:p-6">
            <div className="text-center">
              <Badge
                variant="secondary"
                className="bg-green-100 px-4 py-2 text-sm font-semibold text-green-700 hover:bg-green-100"
              >
                ID: {bookingId}
              </Badge>
            </div>

            <div className="space-y-4 md:space-y-6">
              <div className="grid gap-4 md:grid-cols-2 md:gap-6">
                <div className="flex items-center gap-3 rounded-xl bg-pink-50 p-4 md:gap-4 md:p-6">
                  <Calendar className="h-6 w-6 text-pink-600" />
                  <div>
                    <p className="text-sm text-gray-600">Data</p>
                    <p className="font-semibold text-gray-800">{formatDate(`${bookingData.date}T10:00:00.000Z`)}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-xl bg-pink-50 p-4 md:gap-4 md:p-6">
                  <Clock className="h-6 w-6 text-pink-600" />
                  <div>
                    <p className="text-sm text-gray-600">Horário</p>
                    <p className="font-semibold text-gray-800">{formatTime(bookingData.time)}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-xl bg-rose-50 p-4 md:gap-4 md:p-6">
                <User className="h-6 w-6 text-rose-600" />
                <div className="flex-1">
                  <p className="text-sm text-gray-600">Profissional</p>
                  <p className="font-semibold text-gray-800">{bookingData.professional.name}</p>
                  <p className="text-sm text-rose-600">{bookingData.professional.profession}</p>
                </div>
              </div>

              <div className="space-y-3 rounded-xl border border-pink-200 bg-gradient-to-r from-pink-50 to-rose-50 p-4 md:p-6">
                <h4 className="font-semibold text-gray-800">Tratamento agendado</h4>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-gray-800">{bookingData.service.name}</p>
                    <p className="text-sm text-gray-600">Duração: {formatDuration(bookingData.service.duration)}</p>
                  </div>
                  <p className="text-2xl font-bold text-pink-600">{currency(bookingData.service.value)}</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Next Steps */}
          <Card className="space-y-4 rounded-2xl border-0 bg-white/80 p-4 shadow-lg backdrop-blur-sm md:p-6">
            <h3 className="text-lg font-semibold text-gray-800">Próximos passos</h3>

            <div className="space-y-4">
              <div className="flex items-start gap-3 space-y-1">
                <MessageCircle className="mt-2 h-6 w-6 text-green-600" />
                <div>
                  <p className="font-medium text-gray-800">Confirmação por WhatsApp</p>
                  <p className="text-sm text-gray-600">
                    Enviaremos uma mensagem para <strong>{bookingData.patient.phone}</strong> com todos os detalhes
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 space-y-1">
                <Calendar className="mt-2 h-6 w-6 text-blue-600" />
                <div>
                  <p className="font-medium text-gray-800">Lembrete automático</p>
                  <p className="text-sm text-gray-600">Você receberá um lembrete 24h antes do seu agendamento</p>
                </div>
              </div>

              <div className="flex items-start gap-3 space-y-1">
                <Phone className="mt-2 h-6 w-6 text-purple-600" />
                <div>
                  <p className="font-medium text-gray-800">Dúvidas?</p>
                  <p className="text-sm text-gray-600">Entre em contato conosco pelo WhatsApp: (21) 99999-9999</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Important Info */}
          <Card className="space-y-3 rounded-2xl border border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50 p-4 shadow-lg md:p-6">
            <h4 className="font-semibold text-amber-800">Informações importantes</h4>
            <div className="space-y-2 text-sm text-amber-700">
              <p>• Chegue com 10 minutos de antecedência</p>
              <p>• Traga um documento com foto</p>
              <p>• Para reagendamento, entre em contato com 24h de antecedência</p>
              <p>• Pagamento pode ser feito no local (dinheiro, cartão ou PIX)</p>
            </div>
          </Card>

          {/* Actions */}
          <div className="flex flex-col gap-2 sm:flex-row md:gap-4">
            <Button
              className="!hover:bg-transparent flex-1 rounded-xl border-gray-300 !bg-transparent py-3 font-semibold text-gray-600 transition-all duration-300 hover:border-gray-400"
              variant="outline"
              onClick={() => {
                navigate('/');
              }}
            >
              <Home className="mr-2 h-5 w-5" />
              Voltar ao início
            </Button>

            <Button
              className="flex-1 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:from-green-600 hover:to-emerald-600 hover:shadow-xl"
              onClick={() => {
                toggleCallWhatsapp();
              }}
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              Falar no WhatsApp
            </Button>
          </div>

          {/* Footer Message */}
          <div className="text-center">
            <p className="text-gray-600">Nos vemos em breve! ✨</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export { SuccessPage };
