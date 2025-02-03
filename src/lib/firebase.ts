import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDOK_i0bh049PJwWGckolb0s-cZSr1s78M",
  authDomain: "grindup-4efc8.firebaseapp.com",
  projectId: "grindup-4efc8",
  storageBucket: "grindup-4efc8.firebasestorage.app",
  messagingSenderId: "541027569757",
  appId: "1:541027569757:web:cb4d7d38bcd7daee263db4",
  measurementId: "G-R8PZJ2YNTY"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);