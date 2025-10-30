import { useNavigate } from 'react-router-dom';
import { CheckCircle, Calendar, Clock, User, Phone, Home, MessageCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
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

interface SuccessPageProps {
  bookingData: BookingData;
}

export default function SuccessPage({ bookingData }: SuccessPageProps) {
  const navigate = useNavigate();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const generateBookingId = () => {
    return 'LBC' + Math.random().toString(36).substr(2, 9).toUpperCase();
  };

  const bookingId = generateBookingId();

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50 py-8">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto">
          {/* Success Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              Agendamento confirmado! 🎉
            </h1>
            <p className="text-xl text-gray-600">
              Seu momento de cuidado está agendado 💖
            </p>
          </div>

          {/* Booking Details */}
          <Card className="p-8 border-0 shadow-lg rounded-2xl bg-white/80 backdrop-blur-sm mb-6">
            <div className="text-center mb-6">
              <Badge variant="secondary" className="bg-green-100 text-green-700 hover:bg-green-100 px-4 py-2 text-sm font-semibold">
                ID: {bookingId}
              </Badge>
            </div>

            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-center gap-4 p-4 bg-pink-50 rounded-xl">
                  <Calendar className="w-6 h-6 text-pink-600" />
                  <div>
                    <p className="text-sm text-gray-600">Data</p>
                    <p className="font-semibold text-gray-800">{formatDate(bookingData.date)}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-pink-50 rounded-xl">
                  <Clock className="w-6 h-6 text-pink-600" />
                  <div>
                    <p className="text-sm text-gray-600">Horário</p>
                    <p className="font-semibold text-gray-800">{bookingData.time}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-rose-50 rounded-xl">
                <User className="w-6 h-6 text-rose-600" />
                <div className="flex-1">
                  <p className="text-sm text-gray-600">Profissional</p>
                  <p className="font-semibold text-gray-800">{bookingData.professional.name}</p>
                  <p className="text-sm text-rose-600">{bookingData.professional.specialty}</p>
                </div>
              </div>

              <div className="p-6 bg-gradient-to-r from-pink-50 to-rose-50 rounded-xl border border-pink-200">
                <h4 className="font-semibold text-gray-800 mb-3">Tratamento agendado</h4>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-gray-800">{bookingData.service.name}</p>
                    <p className="text-sm text-gray-600">Duração: {bookingData.service.duration}</p>
                  </div>
                  <p className="text-2xl font-bold text-pink-600">€{bookingData.service.price}</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Next Steps */}
          <Card className="p-6 border-0 shadow-lg rounded-2xl bg-white/80 backdrop-blur-sm mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Próximos passos</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MessageCircle className="w-5 h-5 text-green-600 mt-1" />
                <div>
                  <p className="font-medium text-gray-800">Confirmação por WhatsApp</p>
                  <p className="text-sm text-gray-600">
                    Enviaremos uma mensagem para <strong>{bookingData.phone}</strong> com todos os detalhes
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-blue-600 mt-1" />
                <div>
                  <p className="font-medium text-gray-800">Lembrete automático</p>
                  <p className="text-sm text-gray-600">
                    Você receberá um lembrete 24h antes do seu agendamento
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-purple-600 mt-1" />
                <div>
                  <p className="font-medium text-gray-800">Dúvidas?</p>
                  <p className="text-sm text-gray-600">
                    Entre em contato conosco pelo WhatsApp: (21) 99999-9999
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Important Info */}
          <Card className="p-6 border-0 shadow-lg rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 mb-6">
            <h4 className="font-semibold text-amber-800 mb-3">Informações importantes</h4>
            <div className="space-y-2 text-sm text-amber-700">
              <p>• Chegue com 10 minutos de antecedência</p>
              <p>• Traga um documento com foto</p>
              <p>• Para reagendamento, entre em contato com 24h de antecedência</p>
              <p>• Pagamento pode ser feito no local (dinheiro, cartão ou PIX)</p>
            </div>
          </Card>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              onClick={() => navigate('/')}
              variant="outline"
              className="flex-1 !bg-transparent !hover:bg-transparent border-gray-300 text-gray-600 py-3 rounded-xl font-semibold hover:border-gray-400 transition-all duration-300"
            >
              <Home className="w-5 h-5 mr-2" />
              Voltar ao início
            </Button>

            <Button
              onClick={() => window.open(`https://wa.me/5521999999999?text=Olá! Acabei de fazer um agendamento (ID: ${bookingId}) e gostaria de confirmar os detalhes.`, '_blank')}
              className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Falar no WhatsApp
            </Button>
          </div>

          {/* Footer Message */}
          <div className="text-center mt-8">
            <p className="text-gray-600">
              Nos vemos em breve! ✨
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}