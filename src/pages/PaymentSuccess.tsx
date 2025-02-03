import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, ArrowRight, Sparkles, Package } from 'lucide-react';
import { Link } from '../components/Link';
import { createOrder } from '../services/orderService';
import { auth } from '../lib/firebase';

export default function PaymentSuccess() {
  const location = useLocation();
  const navigate = useNavigate();
  const { orderDetails } = location.state || {};
  const orderId = new URLSearchParams(location.search).get('order');

  useEffect(() => {
    if (!auth.currentUser) {
      navigate('/');
      return;
    }

    // Si l'orderId existe déjà dans l'URL, ne pas créer de nouvelle commande
    if (orderId || !orderDetails) {
      return;
    }

    const initializeOrder = async () => {
      try {
        const newOrderId = await createOrder(orderDetails);
        // Mettre à jour l'URL avec l'ID de la commande sans recharger la page
        window.history.replaceState(
          {}, 
          '', 
          `/payment-success?order=${newOrderId}`
        );
      } catch (error) {
        console.error('Erreur lors de la création de la commande:', error);
        navigate('/video-editing');
      }
    };

    initializeOrder();
  }, [orderDetails, navigate, orderId]);

  if (!orderDetails || !auth.currentUser) {
    navigate('/video-editing');
    return null;
  }

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
              Paiement Confirmé !
            </span>
          </h1>

          <p className="text-xl text-gray-300 mb-8">
            Votre commande a été enregistrée avec succès.
          </p>

          {orderId && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-12"
            >
              <Link
                href={`/order-tracking/${orderId}`}
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary/20 to-accent/20 text-white rounded-lg border border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/30 hover:border-primary/50 group"
              >
                <Package className="w-5 h-5 mr-2 text-primary group-hover:scale-110 transition-transform" />
                <span>Suivre ma commande</span>
              </Link>
            </motion.div>
          )}

          {/* Récapitulatif de la commande */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-12 p-8 rounded-xl bg-gray-900/50 backdrop-blur-sm border border-primary/20 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <h2 className="text-xl font-semibold mb-6 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary mr-2" />
              Récapitulatif de la commande
            </h2>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 rounded-lg bg-black/30">
                <span className="text-gray-400">Type de montage</span>
                <span className="font-medium text-white">{orderDetails.type}</span>
              </div>
              
              <div className="flex justify-between items-center p-3 rounded-lg bg-black/30">
                <span className="text-gray-400">Durée</span>
                <span className="font-medium text-white">{orderDetails.duration} secondes</span>
              </div>
              
              <div className="flex justify-between items-center p-3 rounded-lg bg-black/30">
                <span className="text-gray-400">Révisions</span>
                <span className="font-medium text-white">{orderDetails.revisions}</span>
              </div>

              {/* Options additionnelles */}
              {Object.entries(orderDetails?.options || {}).filter(([_, value]) => value).length > 0 && (
                <div className="pt-4 border-t border-gray-800">
                  <h3 className="text-sm font-medium text-gray-300 mb-3">Options additionnelles</h3>
                  <div className="space-y-2">
                    {Object.entries(orderDetails?.options || {}).map(([key, value]) => {
                      if (value) {
                        return (
                          <div key={key} className="flex justify-between items-center p-3 rounded-lg bg-black/30">
                            <span className="text-gray-400">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                            <span className="text-accent">Inclus</span>
                          </div>
                        );
                      }
                      return null;
                    })}
                  </div>
                </div>
              )}

              <div className="pt-4 border-t border-gray-800">
                <div className="flex justify-between items-center p-3 rounded-lg bg-gradient-to-r from-primary/20 to-accent/20">
                  <span className="text-lg font-semibold text-white">Total</span>
                  <span className="text-xl font-bold text-primary">{orderDetails.total}€</span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex justify-center space-x-4"
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