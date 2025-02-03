import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { 
  FileVideo, 
  Scissors, 
  CheckCircle2, 
  Send,
  AlertCircle
} from 'lucide-react';
import { SupportChat } from '../components/SupportChat';
import { OrderStatus, subscribeToOrderStatus } from '../services/orderService';
import { auth } from '../lib/firebase';

const steps = [
  {
    icon: FileVideo,
    title: 'Commande reçue',
    description: 'Nous avons reçu votre commande',
    status: 'received'
  },
  {
    icon: Scissors,
    title: 'En cours de montage',
    description: 'Notre équipe travaille sur votre projet',
    status: 'editing'
  },
  {
    icon: CheckCircle2,
    title: 'Révision',
    description: 'En attente de votre validation',
    status: 'review'
  },
  {
    icon: Send,
    title: 'Livraison',
    description: 'Livraison de la version finale',
    status: 'delivered'
  }
];

export default function OrderTracking() {
  const navigate = useNavigate();
  const { orderId = '' } = useParams();
  const [orderStatus, setOrderStatus] = useState<OrderStatus | null>(null);

  useEffect(() => {
    if (!auth.currentUser) {
      navigate('/');
      return;
    }

    if (!orderId) return;

    const unsubscribe = subscribeToOrderStatus(orderId, (status) => {
      if (status.userId !== auth.currentUser?.uid) {
        navigate('/');
        return;
      }
      setOrderStatus(status);
    });

    return () => unsubscribe();
  }, [orderId, navigate]);

  const getStepStatus = (stepStatus: string) => {
    if (!orderStatus || orderStatus.error) return 'pending';
    
    const statusOrder = ['received', 'editing', 'review', 'delivered'];
    const currentIndex = statusOrder.indexOf(orderStatus.currentStep);
    const stepIndex = statusOrder.indexOf(stepStatus);

    if (stepIndex < currentIndex) return 'completed';
    if (stepIndex === currentIndex) return 'current';
    return 'pending';
  };

  if (!auth.currentUser) {
    return null;
  }

  return (
    <div className="min-h-screen pt-32 pb-20 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Suivi de commande
            </span>
          </h1>
          <p className="text-gray-300">
            Commande #{orderId}
          </p>
          {orderStatus?.estimatedDelivery && !orderStatus.error && (
            <p className="text-gray-400 mt-2">
              Livraison estimée : {orderStatus.estimatedDelivery.toLocaleDateString('fr-FR')}
            </p>
          )}
        </motion.div>

        {orderStatus?.error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-4 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center space-x-3"
          >
            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
            <p className="text-red-400">{orderStatus.error}</p>
          </motion.div>
        )}

        <div className="space-y-4">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-4 rounded-lg border ${
                getStepStatus(step.status) === 'completed'
                  ? 'border-primary bg-primary/5'
                  : getStepStatus(step.status) === 'current'
                  ? 'border-secondary bg-secondary/5 animate-pulse'
                  : 'border-gray-800 bg-gray-900/50'
              }`}
            >
              <div className="flex items-center space-x-4">
                <div className={`p-2 rounded-full ${
                  getStepStatus(step.status) === 'completed'
                    ? 'bg-primary/20'
                    : getStepStatus(step.status) === 'current'
                    ? 'bg-secondary/20'
                    : 'bg-gray-800'
                }`}>
                  <step.icon className={`w-6 h-6 ${
                    getStepStatus(step.status) === 'completed'
                      ? 'text-primary'
                      : getStepStatus(step.status) === 'current'
                      ? 'text-secondary'
                      : 'text-gray-500'
                  }`} />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-white">{step.title}</h3>
                  <p className="text-sm text-gray-400">{step.description}</p>
                </div>
                {getStepStatus(step.status) === 'completed' && (
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 flex justify-center space-x-4">
          <SupportChat />
        </div>
      </div>
    </div>
  );
}