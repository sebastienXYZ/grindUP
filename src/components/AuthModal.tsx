import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, Loader, AlertCircle } from 'lucide-react';
import { signIn, signUp, resetPassword, AuthError } from '../services/authService';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type AuthMode = 'signin' | 'signup' | 'reset';

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [mode, setMode] = useState<AuthMode>('signin');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setIsLoading(true);

    try {
      if (mode === 'signup') {
        await signUp(formData.email, formData.password);
        setSuccess('Compte créé avec succès !');
        setTimeout(() => {
          onClose();
          setFormData({ email: '', password: '' });
        }, 1500);
      } else if (mode === 'signin') {
        await signIn(formData.email, formData.password);
        setSuccess('Connexion réussie !');
        setTimeout(() => {
          onClose();
          setFormData({ email: '', password: '' });
        }, 1500);
      } else if (mode === 'reset') {
        await resetPassword(formData.email);
        setSuccess('Instructions envoyées par email !');
        setTimeout(() => {
          setMode('signin');
          setFormData({ email: '', password: '' });
        }, 1500);
      }
    } catch (error) {
      const authError = error as AuthError;
      setError(authError.message);
      
      if (mode === 'signin' && authError.code === 'auth/user-not-found') {
        setTimeout(() => {
          setError(null);
          setMode('signup');
        }, 2000);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const switchMode = (newMode: AuthMode) => {
    setMode(newMode);
    setError(null);
    setSuccess(null);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] overflow-hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          
          <div className="fixed inset-0 flex items-center justify-center pointer-events-none p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md bg-gray-900 rounded-xl p-6 shadow-2xl pointer-events-auto"
            >
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <h2 className="text-2xl font-bold mb-6">
                {mode === 'signin' && 'Connexion'}
                {mode === 'signup' && 'Inscription'}
                {mode === 'reset' && 'Réinitialisation du mot de passe'}
              </h2>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center space-x-2 text-red-400"
                >
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <p className="text-sm">{error}</p>
                </motion.div>
              )}

              {success && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-4 p-3 rounded-lg bg-green-500/10 border border-green-500/20 flex items-center space-x-2 text-green-400"
                >
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <p className="text-sm">{success}</p>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-primary"
                      required
                    />
                  </div>
                </div>

                {mode !== 'reset' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Mot de passe
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-primary"
                        minLength={6}
                        required
                      />
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-2 bg-gradient-to-r from-primary via-secondary to-accent text-white rounded-lg hover:opacity-90 transition-all flex items-center justify-center space-x-2"
                >
                  {isLoading ? (
                    <Loader className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      {mode === 'signin' && 'Se connecter'}
                      {mode === 'signup' && "S'inscrire"}
                      {mode === 'reset' && 'Envoyer les instructions'}
                    </>
                  )}
                </button>
              </form>

              <div className="mt-4 text-center text-sm">
                {mode === 'signin' && (
                  <>
                    <button
                      onClick={() => switchMode('reset')}
                      className="text-primary hover:text-primary-light transition-colors"
                    >
                      Mot de passe oublié ?
                    </button>
                    <p className="mt-2 text-gray-400">
                      Pas encore de compte ?{' '}
                      <button
                        onClick={() => switchMode('signup')}
                        className="text-primary hover:text-primary-light transition-colors"
                      >
                        S'inscrire
                      </button>
                    </p>
                  </>
                )}
                {mode === 'signup' && (
                  <p className="text-gray-400">
                    Déjà un compte ?{' '}
                    <button
                      onClick={() => switchMode('signin')}
                      className="text-primary hover:text-primary-light transition-colors"
                    >
                      Se connecter
                    </button>
                  </p>
                )}
                {mode === 'reset' && (
                  <button
                    onClick={() => switchMode('signin')}
                    className="text-primary hover:text-primary-light transition-colors"
                  >
                    Retour à la connexion
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}