import { useNavigate } from 'react-router-dom';
import { Sparkles, Heart, Star, Calendar } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function Index() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50">
      {/* Header */}
      <header className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-rose-400 rounded-2xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                Lisboa Beauty Center
              </h1>
              <p className="text-sm text-gray-500">Clínica de Estética</p>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-5xl font-bold leading-tight">
                Sua beleza
                <span className="block bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                  merece cuidado
                </span>
                especial
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                Descubra tratamentos personalizados que realçam sua beleza natural
                em um ambiente acolhedor e moderno.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white px-8 py-6 rounded-2xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={() => navigate('/booking')}
              >
                <Calendar className="w-5 h-5 mr-2" />
                Agendar agora
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="!bg-transparent !hover:bg-transparent border-pink-300 text-pink-600 px-8 py-6 rounded-2xl text-lg font-semibold hover:border-pink-400 transition-all duration-300"
              >
                Conhecer tratamentos
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="relative z-10">
              <img
                src="/api/placeholder/500/600"
                alt="Ambiente da clínica"
                className="rounded-3xl shadow-2xl w-full object-cover"
              />
            </div>
            <div className="absolute -top-4 -right-4 w-full h-full bg-gradient-to-br from-pink-200 to-rose-200 rounded-3xl -z-10"></div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-gray-800 mb-4">Por que escolher a Lisboa Beauty?</h3>
          <p className="text-gray-600 text-lg">Excelência em cada detalhe do seu cuidado</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="p-8 text-center border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl bg-white/80 backdrop-blur-sm">
            <div className="w-16 h-16 bg-gradient-to-br from-pink-100 to-rose-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Heart className="w-8 h-8 text-pink-500" />
            </div>
            <h4 className="text-xl font-semibold text-gray-800 mb-3">Cuidado Personalizado</h4>
            <p className="text-gray-600">Cada tratamento é desenvolvido especialmente para você e suas necessidades únicas.</p>
          </Card>

          <Card className="p-8 text-center border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl bg-white/80 backdrop-blur-sm">
            <div className="w-16 h-16 bg-gradient-to-br from-pink-100 to-rose-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Star className="w-8 h-8 text-pink-500" />
            </div>
            <h4 className="text-xl font-semibold text-gray-800 mb-3">Profissionais Qualificados</h4>
            <p className="text-gray-600">Nossa equipe é formada por especialistas com anos de experiência e formação continuada.</p>
          </Card>

          <Card className="p-8 text-center border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl bg-white/80 backdrop-blur-sm">
            <div className="w-16 h-16 bg-gradient-to-br from-pink-100 to-rose-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Sparkles className="w-8 h-8 text-pink-500" />
            </div>
            <h4 className="text-xl font-semibold text-gray-800 mb-3">Tecnologia Avançada</h4>
            <p className="text-gray-600">Utilizamos equipamentos de última geração para resultados seguros e eficazes.</p>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-16">
        <Card className="p-12 text-center border-0 shadow-xl rounded-3xl bg-gradient-to-br from-pink-500 to-rose-500 text-white">
          <h3 className="text-3xl font-bold mb-4">Pronta para se cuidar?</h3>
          <p className="text-xl mb-8 text-pink-100">
            Agende seu horário em poucos cliques e comece sua jornada de bem-estar.
          </p>
          <Button
            size="lg"
            variant="secondary"
            className="bg-white text-pink-600 hover:bg-pink-50 px-8 py-6 rounded-2xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            onClick={() => navigate('/booking')}
          >
            <Calendar className="w-5 h-5 mr-2" />
            Começar agendamento
          </Button>
        </Card>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 py-8">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-600">© 2024 Lisboa Beauty Center. Feito com 💖 para você.</p>
        </div>
      </footer>
    </div>
  );
}