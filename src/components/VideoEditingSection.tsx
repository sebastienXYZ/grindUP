import { motion } from 'framer-motion';
import { Video, Scissors, Play, ArrowRight, Clock, Star } from 'lucide-react';
import { Link } from './Link';

export function VideoEditingSection() {
  const features = [
    {
      icon: Video,
      title: "Montage Créatif",
      description: "Des transitions fluides et un storytelling captivant pour des vidéos qui marquent les esprits"
    },
    {
      icon: Scissors,
      title: "Formats Optimisés",
      description: "Adaptés pour chaque plateforme sociale (TikTok, Instagram, YouTube)"
    },
    {
      icon: Clock,
      title: "Délais Rapides",
      description: "Livraison en 24-48h selon vos besoins et votre urgence"
    },
    {
      icon: Star,
      title: "Qualité Premium",
      description: "Un rendu professionnel qui respecte votre identité de marque"
    }
  ];

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

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Montage Vidéo Professionnel
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Transformez vos rushes en contenus viraux avec notre expertise en montage vidéo
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-6 rounded-xl bg-gray-900/50 backdrop-blur-sm border border-gray-800 hover:border-primary/50 transition-all group"
            >
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-accent p-[2px] flex-shrink-0 group-hover:scale-110 transition-transform">
                  <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link
            href="/video-editing"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary via-secondary to-accent text-white rounded-lg hover:opacity-90 transition-all group"
          >
            Découvrir nos services
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}