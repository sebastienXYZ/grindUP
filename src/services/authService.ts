import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  sendPasswordResetEmail,
  User
} from 'firebase/auth';
import { auth } from '../lib/firebase';

export interface AuthError {
  code: string;
  message: string;
}

export const signUp = async (email: string, password: string): Promise<User> => {
  try {
    const { user } = await createUserWithEmailAndPassword(auth, email, password);
    return user;
  } catch (error: any) {
    throw {
      code: error.code,
      message: getErrorMessage(error.code)
    };
  }
};

export const signIn = async (email: string, password: string): Promise<User> => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    return user;
  } catch (error: any) {
    if (error.code === 'auth/user-not-found') {
      throw {
        code: error.code,
        message: 'Aucun compte ne correspond à cet email. Veuillez vous inscrire.'
      };
    }
    throw {
      code: error.code,
      message: getErrorMessage(error.code)
    };
  }
};

export const signOut = async (): Promise<void> => {
  await firebaseSignOut(auth);
};

export const resetPassword = async (email: string): Promise<void> => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error: any) {
    throw {
      code: error.code,
      message: getErrorMessage(error.code)
    };
  }
};

const getErrorMessage = (code: string): string => {
  switch (code) {
    case 'auth/email-already-in-use':
      return 'Cette adresse email est déjà utilisée. Veuillez vous connecter.';
    case 'auth/invalid-email':
      return 'Adresse email invalide';
    case 'auth/operation-not-allowed':
      return 'L\'authentification par email/mot de passe n\'est pas activée';
    case 'auth/weak-password':
      return 'Le mot de passe doit contenir au moins 6 caractères';
    case 'auth/user-disabled':
      return 'Ce compte a été désactivé';
    case 'auth/user-not-found':
      return 'Aucun compte ne correspond à cet email. Veuillez vous inscrire.';
    case 'auth/wrong-password':
      return 'Mot de passe incorrect';
    case 'auth/invalid-credential':
      return 'Email ou mot de passe incorrect';
    case 'auth/too-many-requests':
      return 'Trop de tentatives échouées. Veuillez réessayer plus tard.';
    default:
      return 'Une erreur est survenue. Veuillez réessayer.';
  }
};