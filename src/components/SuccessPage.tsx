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
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-2xl">
          {/* Success Header */}
          <div className="mb-8 text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-emerald-500 shadow-lg">
              <CheckCircle className="h-10 w-10 text-white" />
            </div>
            <h1 className="mb-4 text-3xl font-bold text-gray-800">Agendamento confirmado! 🎉</h1>
            <p className="text-xl text-gray-600">Seu momento de cuidado está agendado 💖</p>
          </div>

          {/* Booking Details */}
          <Card className="mb-6 rounded-2xl border-0 bg-white/80 p-8 shadow-lg backdrop-blur-sm">
            <div className="mb-6 text-center">
              <Badge
                variant="secondary"
                className="bg-green-100 px-4 py-2 text-sm font-semibold text-green-700 hover:bg-green-100"
              >
                ID: {bookingId}
              </Badge>
            </div>

            <div className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="flex items-center gap-4 rounded-xl bg-pink-50 p-4">
                  <Calendar className="h-6 w-6 text-pink-600" />
                  <div>
                    <p className="text-sm text-gray-600">Data</p>
                    <p className="font-semibold text-gray-800">{formatDate(`${bookingData.date}T10:00:00.000Z`)}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 rounded-xl bg-pink-50 p-4">
                  <Clock className="h-6 w-6 text-pink-600" />
                  <div>
                    <p className="text-sm text-gray-600">Horário</p>
                    <p className="font-semibold text-gray-800">{formatTime(bookingData.time)}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-xl bg-rose-50 p-4">
                <User className="h-6 w-6 text-rose-600" />
                <div className="flex-1">
                  <p className="text-sm text-gray-600">Profissional</p>
                  <p className="font-semibold text-gray-800">{bookingData.professional.name}</p>
                  <p className="text-sm text-rose-600">{bookingData.professional.profession}</p>
                </div>
              </div>

              <div className="rounded-xl border border-pink-200 bg-gradient-to-r from-pink-50 to-rose-50 p-6">
                <h4 className="mb-3 font-semibold text-gray-800">Tratamento agendado</h4>
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
          <Card className="mb-6 rounded-2xl border-0 bg-white/80 p-6 shadow-lg backdrop-blur-sm">
            <h3 className="mb-4 text-lg font-semibold text-gray-800">Próximos passos</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MessageCircle className="mt-1 h-5 w-5 text-green-600" />
                <div>
                  <p className="font-medium text-gray-800">Confirmação por WhatsApp</p>
                  <p className="text-sm text-gray-600">
                    Enviaremos uma mensagem para <strong>{bookingData.patient.phone}</strong> com todos os detalhes
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Calendar className="mt-1 h-5 w-5 text-blue-600" />
                <div>
                  <p className="font-medium text-gray-800">Lembrete automático</p>
                  <p className="text-sm text-gray-600">Você receberá um lembrete 24h antes do seu agendamento</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="mt-1 h-5 w-5 text-purple-600" />
                <div>
                  <p className="font-medium text-gray-800">Dúvidas?</p>
                  <p className="text-sm text-gray-600">Entre em contato conosco pelo WhatsApp: (21) 99999-9999</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Important Info */}
          <Card className="mb-6 rounded-2xl border border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50 p-6 shadow-lg">
            <h4 className="mb-3 font-semibold text-amber-800">Informações importantes</h4>
            <div className="space-y-2 text-sm text-amber-700">
              <p>• Chegue com 10 minutos de antecedência</p>
              <p>• Traga um documento com foto</p>
              <p>• Para reagendamento, entre em contato com 24h de antecedência</p>
              <p>• Pagamento pode ser feito no local (dinheiro, cartão ou PIX)</p>
            </div>
          </Card>

          {/* Actions */}
          <div className="flex flex-col gap-4 sm:flex-row">
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
          <div className="mt-8 text-center">
            <p className="text-gray-600">Nos vemos em breve! ✨</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export { SuccessPage };
