import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, CreditCard, Calendar, Shield } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const { orderDetails } = location.state || { orderDetails: null };
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    name: ''
  });

  if (!orderDetails) {
    navigate('/video-editing');
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/payment-success', { state: { orderDetails } });
  };

  const handlePayPalClick = () => {
    navigate('/payment-success', { state: { orderDetails } });
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Paiement Sécurisé
            </span>
          </h1>
          <div className="flex items-center justify-center space-x-2 text-gray-400">
            <Lock className="w-4 h-4" />
            <span>Paiement sécurisé par SSL</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Résumé de la commande */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="p-6 rounded-xl bg-gray-900/50 backdrop-blur-sm border border-gray-800"
          >
            <h2 className="text-xl font-semibold mb-6">Résumé de la commande</h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-400">Type de montage</span>
                <span className="font-medium">{orderDetails?.type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Durée</span>
                <span className="font-medium">{orderDetails?.duration} secondes</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Révisions</span>
                <span className="font-medium">{orderDetails?.revisions}</span>
              </div>

              {/* Options additionnelles */}
              {Object.entries(orderDetails?.options || {}).filter(([_, value]) => value).length > 0 && (
                <div className="pt-4 border-t border-gray-800">
                  <h3 className="text-sm font-medium text-gray-300 mb-3">Options additionnelles</h3>
                  {Object.entries(orderDetails?.options || {}).map(([key, value]) => {
                    if (value) {
                      return (
                        <div key={key} className="flex justify-between text-sm mb-2">
                          <span className="text-gray-400">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                          <span className="text-accent">Inclus</span>
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
              )}

              <div className="border-t border-gray-800 pt-4 mt-4">
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span className="text-primary">{orderDetails?.total}€</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Méthodes de paiement */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* Sélection de la méthode de paiement */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`p-4 rounded-lg border transition-all flex items-center justify-center space-x-2 ${
                  paymentMethod === 'card'
                    ? 'border-primary bg-primary/10'
                    : 'border-gray-800 hover:border-primary/50'
                }`}
              >
                <CreditCard className="w-5 h-5" />
                <span>Carte bancaire</span>
              </button>
              
              <button
                type="button"
                onClick={() => setPaymentMethod('paypal')}
                className={`p-4 rounded-lg border transition-all flex items-center justify-center space-x-2 ${
                  paymentMethod === 'paypal'
                    ? 'border-primary bg-primary/10'
                    : 'border-gray-800 hover:border-primary/50'
                }`}
              >
                <img src="/assets/images/paypal.svg" alt="PayPal" className="h-5" />
                <span>PayPal</span>
              </button>
            </div>

            <div className="p-6 rounded-xl bg-gray-900/50 backdrop-blur-sm border border-gray-800">
              {paymentMethod === 'card' ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Nom sur la carte
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-primary"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Numéro de carte
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={formData.cardNumber}
                        onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-primary"
                        placeholder="1234 5678 9012 3456"
                        required
                      />
                      <CreditCard className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Date d'expiration
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={formData.expiryDate}
                          onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-primary"
                          placeholder="MM/AA"
                          required
                        />
                        <Calendar className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        CVV
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={formData.cvv}
                          onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
                          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-primary"
                          placeholder="123"
                          required
                        />
                        <Shield className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full px-8 py-4 bg-gradient-to-r from-primary via-secondary to-accent text-white rounded-lg hover:opacity-90 transition-all"
                  >
                    Payer {orderDetails?.total}€
                  </button>
                </form>
              ) : (
                <div className="text-center">
                  <p className="text-gray-300 mb-6">
                    Vous allez être redirigé vers PayPal pour finaliser votre paiement en toute sécurité.
                  </p>
                  <button
                    onClick={handlePayPalClick}
                    className="w-full px-8 py-4 bg-[#0070BA] text-white rounded-lg hover:bg-[#003087] transition-all flex items-center justify-center space-x-2"
                  >
                    <img src="/assets/images/paypal-white.svg" alt="PayPal" className="h-5" />
                    <span>Payer avec PayPal</span>
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}