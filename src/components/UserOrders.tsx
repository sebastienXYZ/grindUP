import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Package, Clock, CheckCircle, AlertCircle, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getUserOrders, Order } from '../services/orderService';
import { auth } from '../lib/firebase';

interface UserOrdersProps {
  onClose: () => void;
}

export function UserOrders({ onClose }: UserOrdersProps) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const userOrders = await getUserOrders();
        setOrders(userOrders);
      } catch (error) {
        console.error('Error loading orders:', error);
        setError('Impossible de charger vos commandes');
      } finally {
        setIsLoading(false);
      }
    };

    loadOrders();
  }, []);

  const getStepColor = (step: string) => {
    switch (step) {
      case 'received':
        return 'text-blue-400';
      case 'editing':
        return 'text-yellow-400';
      case 'review':
        return 'text-purple-400';
      case 'delivered':
        return 'text-green-400';
      default:
        return 'text-gray-400';
    }
  };

  const getStepText = (step: string) => {
    switch (step) {
      case 'received':
        return 'Commande reçue';
      case 'editing':
        return 'En cours de montage';
      case 'review':
        return 'En révision';
      case 'delivered':
        return 'Livrée';
      default:
        return 'En attente';
    }
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center">
        <div className="bg-gray-900 rounded-xl p-8 w-full max-w-md">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            <p className="mt-4 text-gray-400">Chargement de vos commandes...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="bg-gray-900 rounded-xl p-6 w-full max-w-md relative"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold flex items-center">
            <Package className="w-5 h-5 mr-2 text-primary" />
            Mes commandes
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>

        {error ? (
          <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
            <div className="flex items-center space-x-2">
              <AlertCircle className="w-5 h-5 text-red-400" />
              <p className="text-red-400">{error}</p>
            </div>
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-8">
            <Package className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400">Vous n'avez pas encore de commande</p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02 }}
                onClick={() => navigate(`/order-tracking/${order.id}`)}
                className="p-4 rounded-lg bg-gray-800/50 border border-gray-700 hover:border-primary/50 transition-all cursor-pointer group"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-medium mb-1">
                      Commande #{order.id.slice(0, 8)}
                    </h3>
                    <p className="text-sm text-gray-400">
                      {new Date(order.createdAt).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                  <span className="text-lg font-bold text-primary">
                    {order.total}€
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {order.currentStep === 'received' && (
                      <Clock className="w-4 h-4 text-blue-400" />
                    )}
                    {order.currentStep === 'editing' && (
                      <Package className="w-4 h-4 text-yellow-400" />
                    )}
                    {order.currentStep === 'review' && (
                      <Package className="w-4 h-4 text-purple-400" />
                    )}
                    {order.currentStep === 'delivered' && (
                      <CheckCircle className="w-4 h-4 text-green-400" />
                    )}
                    <span className={`text-sm ${getStepColor(order.currentStep)}`}>
                      {getStepText(order.currentStep)}
                    </span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-primary transition-colors" />
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}