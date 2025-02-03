import { Mail, Sparkles } from 'lucide-react';

export function Influencer() {
  return (
    <section className="py-20 px-4 relative overflow-hidden">
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

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Tu es un influenceur qui est...
            </span>
          </h2>
        </div>

        <div className="space-y-6 mb-12">
          {[
            "À la recherche de collaborations avec des marques nobles ?",
            "À la recherche d'une famille qui travaille avec toi et pour toi ?",
            "Désireux de rejoindre notre agence parce qu'on est trop cool ?"
          ].map((text, index) => (
            <div
              key={index}
              className="flex items-center space-x-4 p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-primary/50 transition-all group"
            >
              <Sparkles className="w-6 h-6 text-accent group-hover:text-primary transition-colors" />
              <p className="text-lg text-white">{text}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <a
            href="mailto:contact@nexus-agency.com"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary via-secondary to-accent text-white rounded-lg hover:opacity-90 transition-all group glow"
          >
            <Mail className="w-5 h-5 mr-2" />
            <span className="font-medium">Envoie-nous un email !</span>
          </a>
        </div>
      </div>
    </section>
  );
}