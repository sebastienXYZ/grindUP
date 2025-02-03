import { 
  collection, 
  getDocs, 
  doc,
  updateDoc,
  query,
  orderBy,
  Timestamp,
  getDoc,
  getFirestore
} from 'firebase/firestore';
import { auth } from '../lib/firebase';

export interface Quote {
  id: string;
  userId: string;
  userEmail: string;
  type: string;
  duration: string;
  revisions: string;
  options: Record<string, boolean>;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: Date;
  updatedAt: Date;
}

const db = getFirestore();

export const isAdmin = async (): Promise<boolean> => {
  try {
    if (!auth.currentUser) return false;
    
    // Vérifier dans Firestore si l'utilisateur a le rôle admin
    const userDoc = await getDoc(doc(db, 'users', auth.currentUser.uid));
    return userDoc.exists() && userDoc.data()?.role === 'admin';
  } catch (error) {
    console.error('Error checking admin status:', error);
    return false;
  }
};

export const getAllQuotes = async (): Promise<Quote[]> => {
  try {
    if (!await isAdmin()) {
      throw new Error('Accès non autorisé');
    }

    const quotesRef = collection(db, 'quotes');
    const q = query(quotesRef, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);

    return snapshot.docs.map(doc => ({
      ...doc.data(),
      id: doc.id,
      createdAt: (doc.data().createdAt as Timestamp).toDate(),
      updatedAt: (doc.data().updatedAt as Timestamp).toDate()
    })) as Quote[];
  } catch (error) {
    console.error('Error getting quotes:', error);
    throw error;
  }
};

export const updateQuoteStatus = async (
  quoteId: string, 
  status: 'approved' | 'rejected'
): Promise<void> => {
  try {
    if (!await isAdmin()) {
      throw new Error('Accès non autorisé');
    }

    const quoteRef = doc(db, 'quotes', quoteId);
    const quoteDoc = await getDoc(quoteRef);
    
    if (!quoteDoc.exists()) {
      throw new Error('Devis non trouvé');
    }

    await updateDoc(quoteRef, {
      status,
      updatedAt: new Date()
    });
  } catch (error) {
    console.error('Error updating quote status:', error);
    throw error;
  }
};