import { motion } from 'framer-motion';
import { 
  Video, Music, Sparkles, Timer, 
  ArrowRight, FileVideo, MessageSquare, Wand2, Send,
  Star, Zap, Shield
} from 'lucide-react';
import { useState } from 'react';
import { VideoOrderForm } from '../components/VideoOrderForm';
import { VideoHero } from '../components/3d/VideoHero';
import { VideoPortfolio } from '../components/VideoPortfolio';

const features = [
  {
    icon: Video,
    title: "Montage Créatif",
    description: "Des transitions fluides et un storytelling captivant pour des vidéos qui marquent les esprits"
  },
  {
    icon: Music,
    title: "Sound Design",
    description: "Musiques libres de droits et effets sonores premium pour une immersion totale"
  },
  {
    icon: Sparkles,
    title: "Effets Spéciaux",
    description: "Transitions et effets visuels modernes et créatifs qui subliment votre contenu"
  },
  {
    icon: Timer,
    title: "Délais Optimisés",
    description: "Livraison rapide sans compromis sur la qualité de votre projet"
  }
];

const processSteps = [
  {
    icon: FileVideo,
    title: 'Envoi des Rushes',
    description: 'Transmettez-nous vos vidéos brutes via notre plateforme sécurisée'
  },
  {
    icon: MessageSquare,
    title: 'Brief & Direction',
    description: 'Discussion détaillée de vos objectifs et de votre vision créative'
  },
  {
    icon: Wand2,
    title: 'Montage & Effets',
    description: 'Création de votre contenu avec notre expertise professionnelle'
  },
  {
    icon: Send,
    title: 'Livraison',
    description: 'Réception de votre vidéo finale après validation'
  }
];

export default function VideoEditing() {
  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section avec ciel étoilé */}
      <section className="h-screen relative overflow-hidden">
        <VideoHero />
        
        {/* Contenu du Hero */}
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <div className="max-w-6xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center relative"
            >
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="text-5xl md:text-7xl font-bold mb-6"
              >
                <span className="block text-white mb-2">
                  Service de
                </span>
                <span className="block bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  Montage Vidéo Pro
                </span>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.4 }}
                className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto"
              >
                Transformez vos rushes en contenus viraux avec notre expertise en montage vidéo
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.6 }}
              >
                <a
                  href="#order"
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary via-secondary to-accent text-white rounded-lg hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 group"
                >
                  Commander maintenant
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Nos Services
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Une expertise complète pour des vidéos qui captent l'attention
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 px-4 bg-gray-900/30">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Notre Processus
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Un workflow optimisé pour des résultats exceptionnels
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-accent transform -translate-y-1/2" />
            
            {processSteps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 mb-6 rounded-full bg-gradient-to-r from-primary to-accent p-[2px] glow">
                    <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                      <step.icon className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                  <p className="text-gray-400">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <VideoPortfolio />

      {/* Order Form Section */}
      <div id="order">
        <VideoOrderForm />
      </div>
    </div>
  );
}