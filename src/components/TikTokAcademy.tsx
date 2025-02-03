import { Sparkles, GraduationCap, Users, Trophy } from 'lucide-react';

const features = [
  {
    icon: GraduationCap,
    title: 'Formation Expert',
    description: 'Apprenez avec des professionnels ayant fait leurs preuves sur TikTok.',
  },
  {
    icon: Users,
    title: 'Accès Communauté',
    description: 'Rejoignez un réseau exclusif de créateurs de contenu et marketeurs.',
  },
  {
    icon: Trophy,
    title: 'Certification',
    description: 'Obtenez des certifications reconnues en marketing et stratégie TikTok.',
  },
  {
    icon: Sparkles,
    title: 'Tendances',
    description: 'Restez à jour avec nos analyses hebdomadaires des tendances.',
  },
];

export function TikTokAcademy() {
  return (
    <section className="py-20 px-4 relative overflow-hidden" id="academy">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_#2c1a4d,_#000000)]" />
      
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#69C9D0] rounded-full mix-blend-screen filter blur-xl animate-float" />
        <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-[#EE1D52] rounded-full mix-blend-screen filter blur-xl animate-float-delayed" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[#69C9D0] to-[#EE1D52] bg-clip-text text-transparent">
            Académie TikTok
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Maîtrisez l'art du marketing TikTok avec notre programme de formation complet
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-[#69C9D0]/50 transition-all group"
            >
              <feature.icon className="w-12 h-12 text-[#69C9D0] mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="/contact"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#69C9D0] to-[#EE1D52] text-white rounded-lg hover:opacity-90 transition-opacity"
          >
            Rejoindre l'Académie
          </a>
        </div>
      </div>
    </section>
  );
}