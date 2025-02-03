import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, ArrowRight, Clock } from 'lucide-react';
import { Link } from '../components/Link';
import { auth } from '../lib/firebase';

export default function QuoteSuccess() {
  const location = useLocation();
  const navigate = useNavigate();
  const { quoteDetails } = location.state || {};

  useEffect(() => {
    if (!auth.currentUser || !quoteDetails) {
      navigate('/');
    }
  }, [quoteDetails, navigate]);

  if (!quoteDetails) return null;

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 relative bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Particules animées */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-primary rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0, 1, 0],
            scale: [0, 1, 0]
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2
          }}
        />
      ))}

      {/* Orbes lumineux */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/30 rounded-full mix-blend-screen filter blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute bottom-1/4 -right-32 w-96 h-96 bg-accent/30 rounded-full mix-blend-screen filter blur-3xl"
        />
      </div>

      <div className="max-w-2xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="relative w-20 h-20 mx-auto mb-8"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent rounded-full animate-pulse blur-xl opacity-50" />
          <div className="relative w-full h-full rounded-full bg-gradient-to-r from-primary via-secondary to-accent p-[2px]">
            <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
              <Check className="w-10 h-10 text-white" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          <h1 className="text-4xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Demande envoyée !
            </span>
          </h1>

          <div className="space-y-4 text-gray-300">
            <p className="text-xl">
              Merci pour votre demande de devis. Notre équipe va l'étudier dans les plus brefs délais.
            </p>
            
            <div className="flex items-center justify-center space-x-2 text-primary">
              <Clock className="w-5 h-5" />
              <span>Réponse sous 48h maximum</span>
            </div>

            <p className="mt-4">
              Nous vous contacterons à l'adresse {auth.currentUser?.email} pour discuter des détails de votre projet.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex justify-center space-x-4 mt-8"
          >
            <Link
              href="/"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary via-secondary to-accent text-white rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-primary/50 group"
            >
              Retour à l'accueil
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}