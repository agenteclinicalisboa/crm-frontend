import { useNavigate } from 'react-router-dom';
import { Sparkles, Heart, Star, Calendar } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

import heroImage from '@/assets/hero-beauty.jpg';

export default function Index() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50">
      {/* Header */}
      <header className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-400 to-rose-400">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-2xl font-bold text-transparent">
                Lisboa Beauty Center
              </h1>
              <p className="text-sm text-gray-500">Clínica de Estética</p>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-5xl font-bold leading-tight">
                Sua beleza
                <span className="block bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                  merece cuidado
                </span>
                especial
              </h2>
              <p className="text-xl leading-relaxed text-gray-600">
                Descubra tratamentos personalizados que realçam sua beleza natural em um ambiente acolhedor e moderno.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Button
                className="rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 px-8 py-6 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:from-pink-600 hover:to-rose-600 hover:shadow-xl"
                size="lg"
                onClick={() => {
                  navigate('/agendar');
                }}
              >
                <Calendar className="mr-2 h-5 w-5" />
                Agendar agora
              </Button>
              <Button
                className="!hover:bg-transparent rounded-2xl border-pink-300 !bg-transparent px-8 py-6 text-lg font-semibold text-pink-600 transition-all duration-300 hover:border-pink-400"
                variant="outline"
                size="lg"
              >
                Conhecer tratamentos
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="relative z-10">
              <img
                className="w-full rounded-3xl object-cover shadow-2xl"
                src={heroImage}
                alt="Ambiente da clínica"
              />
            </div>
            <div className="absolute -right-4 -top-4 -z-10 h-full w-full rounded-3xl bg-gradient-to-br from-pink-200 to-rose-200"></div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-6 py-16">
        <div className="mb-12 text-center">
          <h3 className="mb-4 text-3xl font-bold text-gray-800">Por que escolher a Lisboa Beauty?</h3>
          <p className="text-lg text-gray-600">Excelência em cada detalhe do seu cuidado</p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <Card className="rounded-2xl border-0 bg-white/80 p-8 text-center shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-100 to-rose-100">
              <Heart className="h-8 w-8 text-pink-500" />
            </div>
            <h4 className="mb-3 text-xl font-semibold text-gray-800">Cuidado Personalizado</h4>
            <p className="text-gray-600">
              Cada tratamento é desenvolvido especialmente para você e suas necessidades únicas.
            </p>
          </Card>

          <Card className="rounded-2xl border-0 bg-white/80 p-8 text-center shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-100 to-rose-100">
              <Star className="h-8 w-8 text-pink-500" />
            </div>
            <h4 className="mb-3 text-xl font-semibold text-gray-800">Profissionais Qualificados</h4>
            <p className="text-gray-600">
              Nossa equipe é formada por especialistas com anos de experiência e formação continuada.
            </p>
          </Card>

          <Card className="rounded-2xl border-0 bg-white/80 p-8 text-center shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-100 to-rose-100">
              <Sparkles className="h-8 w-8 text-pink-500" />
            </div>
            <h4 className="mb-3 text-xl font-semibold text-gray-800">Tecnologia Avançada</h4>
            <p className="text-gray-600">
              Utilizamos equipamentos de última geração para resultados seguros e eficazes.
            </p>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-16">
        <Card className="rounded-3xl border-0 bg-gradient-to-br from-pink-500 to-rose-500 p-12 text-center text-white shadow-xl">
          <h3 className="mb-4 text-3xl font-bold">Pronta para se cuidar?</h3>
          <p className="mb-8 text-xl text-pink-100">
            Agende seu horário em poucos cliques e comece sua jornada de bem-estar.
          </p>
          <Button
            className="rounded-2xl bg-white px-6 py-6 font-semibold text-pink-600 shadow-lg transition-all duration-300 hover:bg-pink-50 hover:shadow-xl md:px-8 md:text-lg"
            size="lg"
            variant="secondary"
            onClick={() => {
              navigate('/agendar');
            }}
          >
            <Calendar className="h-5 w-5 md:mr-2" />
            Fazer agendandamento
          </Button>
        </Card>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 py-8">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-600">© 2025 Lisboa Beauty Center. Feito com 💖 para você.</p>
        </div>
      </footer>
    </div>
  );
}
