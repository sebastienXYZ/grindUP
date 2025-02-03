import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
  {
    question: "Quels réseaux sociaux couvrez-vous ?",
    answer: "Nous nous spécialisons dans TikTok, Instagram, Twitch et YouTube, avec une expertise particulière dans le gaming et le lifestyle."
  },
  {
    question: "Comment se déroule la collaboration ?",
    answer: "Nous commençons par un audit gratuit de votre présence digitale, suivi d'une stratégie personnalisée. Nous travaillons en étroite collaboration avec vous pour atteindre vos objectifs."
  },
  {
    question: "Quelle est la durée minimale d'engagement ?",
    answer: "Nous proposons des contrats flexibles à partir de 3 mois, permettant d'établir une stratégie efficace et d'obtenir des résultats tangibles."
  },
  {
    question: "Comment mesurez-vous les résultats ?",
    answer: "Nous utilisons des outils analytics avancés et fournissons des rapports détaillés mensuels sur les KPIs définis ensemble : engagement, portée, conversions, etc."
  }
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-20 px-4 relative overflow-hidden" id="faq">
      <div className="max-w-3xl mx-auto relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
          <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            FAQ
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
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="text-lg font-medium text-white">{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-accent" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-accent" />
                )}
              </button>
              
              <div
                className={`px-6 overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-48 py-4' : 'max-h-0'
                }`}
              >
                <p className="text-gray-300">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}