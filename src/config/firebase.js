// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAuth, GoogleAuthProvider } from "firebase/auth";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyDAwF525kqC_vBNuX_wZYbD3C9ksbzSCiM",
//   authDomain: "fir-auth-21dfc.firebaseapp.com",
//   projectId: "fir-auth-21dfc",
//   storageBucket: "fir-auth-21dfc.firebasestorage.app",
//   messagingSenderId: "880629048133",
//   appId: "1:880629048133:web:b29844fcfbb63ea3e5542c"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app);
// export const googleProvider = new GoogleAuthProvider();

import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  getRedirectResult, 
  GoogleAuthProvider,
  signInWithPopup,  // Changed from signInWithRedirect
  signInWithRedirect // Keep as fallback
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDAwF525kqC_vBNuX_wZYbD3C9ksbzSCiM",
  authDomain: "fir-auth-21dfc.firebaseapp.com",
  projectId: "fir-auth-21dfc",
  storageBucket: "fir-auth-21dfc.firebasestorage.app",
  messagingSenderId: "880629048133",
  appId: "1:880629048133:web:b29844fcfbb63ea3e5542c"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Smart function that tries popup first, falls back to redirect
export const googleSignIn = async () => {
  try {
    // First try popup
    return await signInWithPopup(auth, googleProvider);
  } catch (popupError) {
    if (popupError.code === 'auth/popup-blocked') {
      // Fallback to redirect if popup is blocked
      await signInWithRedirect(auth, googleProvider);
      return null; // Redirect flow will handle the result
    }
    throw popupError;
  }
};

// For handling redirect results (fallback)
export const getAuthRedirectResult = async () => {
  return await getRedirectResult(auth);
};

