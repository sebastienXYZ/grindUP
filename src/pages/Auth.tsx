import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, Loader, AlertCircle } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { signIn, signUp, resetPassword, AuthError } from '../services/authService';

type AuthMode = 'signin' | 'signup' | 'reset';

export default function Auth() {
  const navigate = useNavigate();
  const location = useLocation();
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
          navigate(location.state?.from || '/');
        }, 1500);
      } else if (mode === 'signin') {
        await signIn(formData.email, formData.password);
        setSuccess('Connexion réussie !');
        setTimeout(() => {
          navigate(location.state?.from || '/');
        }, 1500);
      } else if (mode === 'reset') {
        await resetPassword(formData.email);
        setSuccess('Instructions envoyées par email !');
        setTimeout(() => {
          setMode('signin');
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
    <div className="min-h-screen pt-32 pb-20 px-4 bg-gradient-to-br from-black via-gray-900 to-black">
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

      <div className="max-w-md mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-900/80 backdrop-blur-lg rounded-xl p-8 shadow-2xl border border-gray-800"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">
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
              className="w-full py-3 bg-gradient-to-r from-primary via-secondary to-accent text-white rounded-lg hover:opacity-90 transition-all flex items-center justify-center space-x-2"
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

          <div className="mt-6 text-center text-sm">
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
  );
}