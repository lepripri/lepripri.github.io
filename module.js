// Firebase core
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-analytics.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-storage.js";
import { getAuth, signOut } from
"https://www.gstatic.com/firebasejs/12.8.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDu0_TtOqAybnVLe7Ye1UcUUjbU8513BUA",
  authDomain: "le-pripri.firebaseapp.com",
  projectId: "le-pripri",
  storageBucket: "le-pripri.firebasestorage.app",
  messagingSenderId: "80244197022",
  appId: "1:80244197022:web:420e34b41cbcf68f02dd8f",
  measurementId: "G-BFCPKQKX2Y"
};

// Init
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
function logout() {
  signOut(auth)
    .then(() => {
      console.log("Déconnecté ✔");
    })
    .catch((error) => {
      console.error("Erreur de déconnexion", error);
    });
}
// 🔥 exposé globalement
window.Pripri = {
  app,
  analytics,
  auth,
  db,
  storage,
  user: null
};

console.log("🔥 Firebase prêt");
