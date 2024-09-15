import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
//authentication
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyAfTJiWg45GgYV_IDlFFTWskVI3mgJy3iU",
  authDomain: "medalgo-798a9.firebaseapp.com",
  projectId: "medalgo-798a9",
  storageBucket: "medalgo-798a9.appspot.com",
  messagingSenderId: "182706117960",
  appId: "1:182706117960:web:8c87505ad8d7326536677d",
  measurementId: "G-TSH5T07GCQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export {app, auth, db}