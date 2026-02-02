// Firebase core
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-analytics.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-storage.js";
import {
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-auth.js";
import {} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";
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

// PROVIDERS
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

// LOGIN FUNCTIONS
function loginGoogle() {
  signInWithPopup(auth, googleProvider);
}

function loginGithub() {
  signInWithPopup(auth, githubProvider);
}

function loginEmail(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

function registerEmail(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}

// ===============================
// AUTH STATE
// ===============================
window.Pripri = {
  app,
  analytics,
  db,
  storage,
  logout,
  login: {
    registerEmail,
    loginEmail,
    loginGithub,
    loginGoogle
  },
  auth,
  isConnected: false
};
onAuthStateChanged(auth, user => {
  if (user) {
    console.log("✅ Connecté :", user.uid);
    document.body.setAttribute("logged", "");
    Pripri.isConnected = true;
  } else {
    console.log("❌ Déconnecté");
    document.body.removeAttribute("logged");
  }
});

// ===============================
// EXPOSE GLOBAL (IMPORTANT)
// ===============================
if (!Pripri.auth.currentUser === null) {
    Pripri.isConnected = true;
}
async function saveKeyToCloud(apiKey) {
  const user = Pripri.auth.currentUser;
  if (!user) return alert("Connecte-toi d'abord !");

  try {
    await setDoc(doc(Pripri.db, "users", user.uid), {
      aiKey: apiKey
    }, { merge: true });
    console.log("Clé sauvegardée sur ton compte Pripri ! ☁️");
  } catch (e) {
    console.error("Erreur de sauvegarde", e);
  }
}
console.log("🔥 Firebase ready");
