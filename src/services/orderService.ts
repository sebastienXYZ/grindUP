import { 
  collection, 
  doc,
  addDoc,
  getDocs,
  getDoc,
  query,
  where,
  orderBy,
  onSnapshot,
  serverTimestamp,
  Timestamp
} from 'firebase/firestore';
import { db, auth } from '../lib/firebase';

export interface Order {
  id: string;
  userId: string;
  userEmail: string;
  type: string;
  duration: string;
  revisions: string;
  total: number;
  options: Record<string, boolean>;
  currentStep: 'received' | 'editing' | 'review' | 'delivered';
  createdAt: Date;
  updatedAt: Date;
  estimatedDelivery: Date;
}

export const createOrder = async (orderDetails: Omit<Order, 'id' | 'userId' | 'userEmail' | 'currentStep' | 'createdAt' | 'updatedAt' | 'estimatedDelivery'>): Promise<string> => {
  try {
    if (!auth.currentUser) {
      throw new Error('Vous devez être connecté pour créer une commande');
    }

    // Calculer la date de livraison estimée (3 jours ouvrés)
    const estimatedDelivery = new Date();
    estimatedDelivery.setDate(estimatedDelivery.getDate() + 3);

    const orderRef = await addDoc(collection(db, 'orders'), {
      ...orderDetails,
      userId: auth.currentUser.uid,
      userEmail: auth.currentUser.email,
      currentStep: 'received',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      estimatedDelivery
    });

    return orderRef.id;
  } catch (error) {
    console.error('Erreur lors de la création de la commande:', error);
    throw error;
  }
};

export const getUserOrders = async (): Promise<Order[]> => {
  try {
    if (!auth.currentUser) {
      throw new Error('Vous devez être connecté pour voir vos commandes');
    }

    const ordersRef = collection(db, 'orders');
    const q = query(
      ordersRef,
      where('userId', '==', auth.currentUser.uid),
      orderBy('createdAt', 'desc')
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      ...doc.data(),
      id: doc.id,
      createdAt: (doc.data().createdAt as Timestamp).toDate(),
      updatedAt: (doc.data().updatedAt as Timestamp).toDate(),
      estimatedDelivery: doc.data().estimatedDelivery.toDate()
    })) as Order[];
  } catch (error) {
    console.error('Erreur lors de la récupération des commandes:', error);
    throw error;
  }
};

export const subscribeToOrderStatus = (
  orderId: string,
  callback: (status: Order) => void
): (() => void) => {
  try {
    if (!auth.currentUser) {
      throw new Error('Vous devez être connecté pour suivre une commande');
    }

    const orderRef = doc(db, 'orders', orderId);
    return onSnapshot(
      orderRef,
      (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.data();
          callback({
            ...data,
            id: snapshot.id,
            createdAt: (data.createdAt as Timestamp).toDate(),
            updatedAt: (data.updatedAt as Timestamp).toDate(),
            estimatedDelivery: data.estimatedDelivery.toDate()
          } as Order);
        }
      },
      (error) => {
        console.error('Erreur lors du suivi de la commande:', error);
        throw error;
      }
    );
  } catch (error) {
    console.error('Erreur lors de l\'abonnement au statut de la commande:', error);
    throw error;
  }
};