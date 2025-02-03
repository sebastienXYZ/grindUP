import { useState } from 'react';
import { 
  BarChart3, 
  Share2, 
  Target, 
  PenTool, 
  Users, 
  ChevronDown,
  ChevronUp,
  ArrowRight,
  CheckCircle2,
  Rocket,
  Trophy
} from 'lucide-react';
import { Link } from '../components/Link';

const services = [
  {
    icon: BarChart3,
    title: 'Stratégie de Marketing Digital',
    description: 'Développez votre présence en ligne avec des stratégies data-driven sur mesure pour maximiser votre ROI.',
    features: ['Analyse de marché', 'Plan stratégique', 'KPIs personnalisés'],
    cta: 'Demander une consultation gratuite'
  },
  {
    icon: Share2,
    title: 'Gestion des Réseaux Sociaux',
    description: 'Créez une communauté engagée avec du contenu percutant et une gestion professionnelle de vos réseaux.',
    features: ['Calendrier éditorial', 'Création de contenu', 'Community management'],
    cta: 'Lancer votre projet'
  },
  {
    icon: Target,
    title: 'Publicité en Ligne (PPC)',
    description: 'Maximisez votre visibilité et vos conversions avec des campagnes publicitaires ciblées et optimisées.',
    features: ['Google Ads', 'Facebook Ads', 'TikTok Ads'],
    cta: 'Commencer une campagne'
  },
  {
    icon: PenTool,
    title: 'Création de Contenu Visuel',
    description: 'Démarquez-vous avec des visuels professionnels qui captivent votre audience et renforcent votre image.',
    features: ['Design graphique', 'Montage vidéo', 'Animation'],
    cta: 'Voir nos réalisations'
  },
  {
    icon: Users,
    title: 'Formation TikTok et Influenceurs',
    description: 'Maîtrisez les codes de TikTok et développez des partenariats influenceurs impactants.',
    features: ['Stratégie influenceurs', 'Formation TikTok', 'Gestion de campagnes'],
    cta: "S'inscrire à la formation"
  }
];

const process = [
  {
    icon: Target,
    title: 'Analyse de la marque',
    description: 'Étude approfondie de votre marque et de vos objectifs'
  },
  {
    icon: Rocket,
    title: 'Stratégie personnalisée',
    description: "Création d'une stratégie sur mesure adaptée à vos besoins"
  },
  {
    icon: CheckCircle2,
    title: 'Mise en œuvre',
    description: 'Déploiement des actions et suivi des performances'
  },
  {
    icon: Trophy,
    title: 'Résultats & Optimisation',
    description: 'Analyse des résultats et optimisation continue'
  }
];

const testimonials = [
  {
    name: 'Marie D.',
    role: 'CEO, Brand Fashion',
    content: 'Une équipe professionnelle qui a su comprendre nos besoins et délivrer des résultats exceptionnels.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150'
  },
  {
    name: 'Thomas L.',
    role: 'Influenceur Gaming',
    content: "Grâce à Grindup, j'ai pu professionnaliser ma présence en ligne et multiplier mes collaborations par 3.",
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=150&h=150'
  }
];

const faqs = [
  {
    question: 'Comment fonctionne une campagne marketing ?',
    answer: 'Nous commençons par une analyse approfondie de vos besoins, définissons des objectifs clairs, puis créons une stratégie personnalisée. Nous déployons ensuite la campagne avec un suivi régulier et des optimisations continues.'
  },
  {
    question: 'Quels types de marques accompagnez-vous ?',
    answer: 'Nous travaillons avec des marques de toutes tailles, du startup au grand groupe, principalement dans les secteurs du gaming, lifestyle, mode et technologie.'
  },
  {
    question: 'Comment puis-je savoir si mes campagnes sont efficaces ?',
    answer: 'Nous fournissons des rapports détaillés avec des KPIs personnalisés et des analyses approfondies. Vous avez accès à un dashboard en temps réel pour suivre vos performances.'
  }
];

export default function Services() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Email submitted:', email);
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black opacity-90" />
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: '200px',
                height: '200px',
                background: i % 2 ? 'radial-gradient(circle, var(--primary) 0%, transparent 70%)' : 'radial-gradient(circle, var(--accent) 0%, transparent 70%)',
                filter: 'blur(40px)',
                opacity: '0.3',
                animationDelay: `${i * -4}s`
              }}
            />
          ))}
        </div>

        <div className="max-w-6xl mx-auto relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="block text-white">Nos Services :</span>
            <span className="block bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Boostez votre présence digitale
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
            Des stratégies sur-mesure pour un impact maximal
          </p>
          <a href="#services" className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary via-secondary to-accent text-white rounded-lg hover:opacity-90 transition-all group">
            Découvrez nos solutions
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div
                key={service.title}
                className="p-8 rounded-xl bg-gray-900/50 backdrop-blur-sm border border-gray-800 hover:border-primary/50 transition-all group"
              >
                <service.icon className="w-12 h-12 text-accent mb-6 group-hover:scale-110 transition-transform" />
                <h3 className="text-2xl font-bold text-white mb-4">{service.title}</h3>
                <p className="text-gray-300 mb-6">{service.description}</p>
                <ul className="space-y-3 mb-8">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center text-gray-400">
                      <CheckCircle2 className="w-5 h-5 text-primary mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className="w-full px-6 py-3 bg-gradient-to-r from-primary via-secondary to-accent text-white rounded-lg hover:opacity-90 transition-colors">
                  {service.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 px-4 bg-gray-900/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Notre Processus
            </span>
          </h2>

          <div className="relative">
            <div className="process-line left-0 right-0" />
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {process.map((step, index) => (
                <div key={step.title} className="relative float">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 mb-4 rounded-full bg-gradient-to-r from-primary to-accent p-[2px] glow">
                      <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                        <step.icon className="w-8 h-8 text-white" />
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">{step.title}</h3>
                    <p className="text-gray-400">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Ils nous font confiance
            </span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.name}
                className="p-6 rounded-xl bg-gray-900/50 backdrop-blur-sm border border-gray-800"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-white">{testimonial.name}</h3>
                    <p className="text-accent">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-300 italic">{testimonial.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4 bg-gray-900/30">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Questions Fréquentes
            </span>
          </h2>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-gray-800 rounded-lg overflow-hidden bg-gray-900/50 backdrop-blur-sm hover:border-primary/50 transition-colors"
              >
                <button
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-800/50 transition-colors"
                  onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                >
                  <span className="text-lg font-medium text-white">{faq.question}</span>
                  {openFaqIndex === index ? (
                    <ChevronUp className="w-5 h-5 text-accent" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-accent" />
                  )}
                </button>
                
                <div
                  className={`px-6 overflow-hidden transition-all duration-300 ${
                    openFaqIndex === index ? 'max-h-48 py-4' : 'max-h-0'
                  }`}
                >
                  <p className="text-gray-300">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Prêt à propulser votre marque ?
            </span>
          </h2>
          
          <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
            <div className="flex gap-4">
              <input
                type="email"
                placeholder="Votre email professionnel"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-6 py-3 rounded-lg bg-white/10 border border-primary/20 text-white placeholder-gray-400 focus:outline-none focus:border-primary"
                required
              />
              <button
                type="submit"
                className="px-8 py-3 bg-gradient-to-r from-primary via-secondary to-accent text-white rounded-lg hover:opacity-90 transition-all whitespace-nowrap"
              >
                Démarrer maintenant
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}