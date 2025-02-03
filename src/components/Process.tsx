import { CheckCircle2, Rocket, Target, Trophy } from 'lucide-react';

const steps = [
  {
    icon: Target,
    title: 'Stratégie',
    description: 'Analyse et planification personnalisée'
  },
  {
    icon: Rocket,
    title: 'Création',
    description: 'Production de contenu engageant'
  },
  {
    icon: CheckCircle2,
    title: 'Optimisation',
    description: 'Amélioration continue des performances'
  },
  {
    icon: Trophy,
    title: 'Résultats',
    description: 'Croissance mesurable et durable'
  }
];

export function Process() {
  return (
    <section className="py-20 px-4 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-white">
          Notre <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Processus</span>
        </h2>

        <div className="relative">
          <div className="process-line left-0 right-0" />
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {steps.map((step, index) => (
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
  );
}