import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Package, 
  Clock, 
  CheckCircle, 
  XCircle,
  Mail,
  Calendar,
  ArrowRight,
  Search,
  Filter,
  AlertCircle
} from 'lucide-react';
import { auth } from '../lib/firebase';
import { getAllQuotes, updateQuoteStatus, Quote, isAdmin } from '../services/adminService';

export default function Admin() {
  const navigate = useNavigate();
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [adminChecked, setAdminChecked] = useState(false);

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        if (!auth.currentUser) {
          navigate('/auth', { state: { from: '/admin' } });
          return;
        }

        const adminStatus = await isAdmin();
        if (!adminStatus) {
          navigate('/', { replace: true });
          return;
        }

        setAdminChecked(true);
        loadQuotes();
      } catch (error) {
        console.error('Error checking admin status:', error);
        setError("Une erreur est survenue lors de la vérification des droits d'accès");
        setIsLoading(false);
      }
    };

    checkAdmin();
  }, [navigate]);

  const loadQuotes = async () => {
    try {
      const fetchedQuotes = await getAllQuotes();
      setQuotes(fetchedQuotes);
    } catch (error) {
      console.error('Error loading quotes:', error);
      setError('Impossible de charger les devis');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateStatus = async (quoteId: string, status: 'approved' | 'rejected') => {
    try {
      await updateQuoteStatus(quoteId, status);
      await loadQuotes(); // Recharger les devis après la mise à jour
    } catch (error) {
      console.error('Error updating quote status:', error);
      setError('Impossible de mettre à jour le statut du devis');
    }
  };

  const filteredQuotes = quotes.filter(quote => {
    if (filter !== 'all' && quote.status !== filter) return false;
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      return (
        quote.userEmail.toLowerCase().includes(searchLower) ||
        quote.id.toLowerCase().includes(searchLower)
      );
    }
    return true;
  });

  if (!adminChecked || isLoading) {
    return (
      <div className="min-h-screen pt-32 flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-32 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="p-6 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center space-x-4">
            <AlertCircle className="w-8 h-8 text-red-400 flex-shrink-0" />
            <div>
              <h2 className="text-xl font-semibold text-red-400 mb-1">Erreur d'accès</h2>
              <p className="text-red-300">{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-3xl font-bold">
            Interface Administrateur
          </h1>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Rechercher..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-primary w-full sm:w-64"
              />
            </div>
            
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as typeof filter)}
              className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-primary"
            >
              <option value="all">Tous les devis</option>
              <option value="pending">En attente</option>
              <option value="approved">Approuvés</option>
              <option value="rejected">Rejetés</option>
            </select>
          </div>
        </div>

        {filteredQuotes.length === 0 ? (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400">Aucun devis trouvé</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {filteredQuotes.map((quote) => (
              <motion.div
                key={quote.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 rounded-xl bg-gray-900/50 backdrop-blur-sm border border-gray-800"
              >
                <div className="flex flex-col lg:flex-row justify-between gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <Mail className="w-5 h-5 text-primary" />
                      <span className="text-lg font-medium">{quote.userEmail}</span>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <Calendar className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-400">
                        {new Date(quote.createdAt).toLocaleDateString('fr-FR', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div className="p-3 rounded-lg bg-gray-800/50">
                        <span className="text-gray-400">Type</span>
                        <p className="font-medium">{quote.type}</p>
                      </div>
                      <div className="p-3 rounded-lg bg-gray-800/50">
                        <span className="text-gray-400">Durée</span>
                        <p className="font-medium">{quote.duration} secondes</p>
                      </div>
                      <div className="p-3 rounded-lg bg-gray-800/50">
                        <span className="text-gray-400">Révisions</span>
                        <p className="font-medium">{quote.revisions}</p>
                      </div>
                    </div>

                    {Object.entries(quote.options).filter(([_, value]) => value).length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {Object.entries(quote.options).map(([key, value]) => {
                          if (value) {
                            return (
                              <span
                                key={key}
                                className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm"
                              >
                                {key.replace(/([A-Z])/g, ' $1').trim()}
                              </span>
                            );
                          }
                          return null;
                        })}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col justify-between gap-4">
                    <div className="flex items-center space-x-2">
                      {quote.status === 'pending' && (
                        <Clock className="w-5 h-5 text-yellow-400" />
                      )}
                      {quote.status === 'approved' && (
                        <CheckCircle className="w-5 h-5 text-green-400" />
                      )}
                      {quote.status === 'rejected' && (
                        <XCircle className="w-5 h-5 text-red-400" />
                      )}
                      <span className={`
                        ${quote.status === 'pending' && 'text-yellow-400'}
                        ${quote.status === 'approved' && 'text-green-400'}
                        ${quote.status === 'rejected' && 'text-red-400'}
                      `}>
                        {quote.status === 'pending' && 'En attente'}
                        {quote.status === 'approved' && 'Approuvé'}
                        {quote.status === 'rejected' && 'Rejeté'}
                      </span>
                    </div>

                    {quote.status === 'pending' && (
                      <div className="flex flex-col sm:flex-row gap-2">
                        <button
                          onClick={() => handleUpdateStatus(quote.id, 'approved')}
                          className="px-4 py-2 bg-green-500/10 text-green-400 rounded-lg hover:bg-green-500/20 transition-colors flex items-center justify-center space-x-2"
                        >
                          <CheckCircle className="w-4 h-4" />
                          <span>Approuver</span>
                        </button>
                        <button
                          onClick={() => handleUpdateStatus(quote.id, 'rejected')}
                          className="px-4 py-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition-colors flex items-center justify-center space-x-2"
                        >
                          <XCircle className="w-4 h-4" />
                          <span>Rejeter</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}