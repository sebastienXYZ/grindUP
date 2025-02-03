import { 
  collection, 
  addDoc, 
  query, 
  where, 
  orderBy, 
  onSnapshot,
  serverTimestamp,
  DocumentData 
} from 'firebase/firestore';
import { db, auth } from '../lib/firebase';

export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'admin';
  timestamp: Date;
  orderId: string;
  read: boolean;
}

export const sendMessage = async (
  orderId: string, 
  content: string, 
  sender: 'user' | 'admin'
): Promise<void> => {
  try {
    if (!auth.currentUser) {
      throw new Error('Vous devez être connecté pour envoyer des messages');
    }

    const chatRef = collection(db, 'chats', orderId, 'messages');
    await addDoc(chatRef, {
      content,
      sender,
      userId: auth.currentUser.uid,
      timestamp: serverTimestamp(),
      read: false
    });
  } catch (error) {
    console.error('Erreur lors de l\'envoi du message:', error);
    throw error;
  }
};

export const subscribeToMessages = (
  orderId: string,
  callback: (messages: ChatMessage[]) => void,
  onError?: (error: Error) => void
): (() => void) => {
  try {
    if (!auth.currentUser) {
      throw new Error('Vous devez être connecté pour voir les messages');
    }

    const chatRef = collection(db, 'chats', orderId, 'messages');
    const q = query(
      chatRef,
      orderBy('timestamp', 'asc')
    );

    return onSnapshot(
      q,
      (snapshot) => {
        const messages = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          timestamp: doc.data().timestamp?.toDate() || new Date()
        })) as ChatMessage[];
        
        callback(messages);
      },
      (error) => {
        console.error('Erreur lors de la récupération des messages:', error);
        onError?.(error);
      }
    );
  } catch (error) {
    console.error('Erreur lors de l\'abonnement aux messages:', error);
    onError?.(error as Error);
    return () => {};
  }
};