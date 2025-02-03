import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { auth } from '../lib/firebase';

export function VideoOrderForm() {
  const navigate = useNavigate();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    type: 'standard',
    duration: '60',
    revisions: '2',
    options: {
      colorGrading: false,
      soundDesign: false,
      motionGraphics: false,
      scriptWriting: false,
      voiceOver: false,
      threeDElements: false,
      contentStrategy: false
    }
  });

  const handleOpenForm = () => {
    if (!auth.currentUser) {
      navigate('/auth', { state: { from: window.location.pathname } });
      return;
    }
    setIsFormOpen(true);
  };

  const handleSubmit = () => {
    const quoteDetails = {
      type: formData.type,
      duration: formData.duration,
      revisions: formData.revisions,
      options: formData.options,
      email: auth.currentUser?.email,
      status: 'pending',
      createdAt: new Date()
    };

    navigate('/quote-success', { state: { quoteDetails } });
  };

  return (
    <section className="py-20 px-4 relative">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-8">
          <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Prêt à créer votre vidéo ?
          </span>
        </h2>
        
        <button
          onClick={handleOpenForm}
          className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary via-secondary to-accent text-white rounded-lg hover:opacity-90 transition-all"
        >
          <span>Demander un devis</span>
          <ArrowRight className="ml-2 w-5 h-5" />
        </button>
      </div>

      {isFormOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 overflow-y-auto"
        >
          <div className="min-h-screen px-4 py-8 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-gray-900 rounded-xl p-4 sm:p-6 w-full max-w-2xl relative mx-auto my-auto"
            >
              <button
                onClick={() => setIsFormOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              >
                <ArrowRight className="w-6 h-6" />
              </button>

              <h3 className="text-xl sm:text-2xl font-bold mb-6">Configurez votre devis</h3>

              <div className="space-y-6">
                {/* Type de montage */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Type de montage
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-primary"
                  >
                    <option value="standard">Standard</option>
                    <option value="premium">Premium</option>
                    <option value="pro">Professionnel</option>
                  </select>
                </div>

                {/* Durée */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Durée de la vidéo
                  </label>
                  <select
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-primary"
                  >
                    <option value="60">Moins de 1 minute</option>
                    <option value="180">1-3 minutes</option>
                    <option value="600">Plus de 10 minutes</option>
                  </select>
                </div>

                {/* Révisions */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Nombre de révisions
                  </label>
                  <select
                    value={formData.revisions}
                    onChange={(e) => setFormData({ ...formData, revisions: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-primary"
                  >
                    <option value="2">2 révisions</option>
                    <option value="3">3 révisions</option>
                    <option value="5">5 révisions</option>
                    <option value="unlimited">Révisions illimitées</option>
                  </select>
                </div>

                {/* Options additionnelles */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Options additionnelles
                  </label>
                  <div className="space-y-2">
                    {Object.entries(formData.options).map(([key, value]) => (
                      <label
                        key={key}
                        className="flex items-center justify-between p-3 rounded-lg border border-gray-800 hover:border-primary/50 transition-all cursor-pointer"
                      >
                        <span className="text-gray-300">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </span>
                        <input
                          type="checkbox"
                          checked={value}
                          onChange={(e) => 
                            setFormData({
                              ...formData,
                              options: {
                                ...formData.options,
                                [key]: e.target.checked
                              }
                            })
                          }
                          className="w-5 h-5 rounded border-gray-700 text-primary focus:ring-primary bg-gray-800"
                        />
                      </label>
                    ))}
                  </div>
                </div>

                <button
                  onClick={handleSubmit}
                  className="w-full px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-primary via-secondary to-accent text-white rounded-lg hover:opacity-90 transition-all flex items-center justify-center text-sm sm:text-base"
                >
                  <span>Envoyer la demande</span>
                  <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </section>
  );
}