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
    signOut,
    FacebookAuthProvider
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyDu0_TtOqAybnVLe7Ye1UcUUjbU8513BUA",
    authDomain: "le-pripri.firebaseapp.com",
    projectId: "le-pripri",
    storageBucket: "le-pripri.firebasestorage.app",
    messagingSenderId: "80244197022",
    appId: "1:80244197022:web:420e34b41cbcf68f02dd8f",
    measurementId: "G-BFCPKQKX2Y"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Actions
const logout = () => signOut(auth).then(() => console.log("Déconnecté ✔"));

// Fonctions de sauvegarde Firestore
async function saveKeyToCloud(apiKey) {
    const user = auth.currentUser;
    if (!user) {
        console.warn("Utilisateur non connecté");
        return;
    }

    try {
        await setDoc(doc(db, "users", user.uid), {
            aiKey: apiKey,
            lastUpdate: new Date().toISOString()
        }, { merge: true });
        console.log("Clé sauvegardée sur ton compte Le Pripri ! ☁️");
    } catch (e) {
        console.error("Erreur de sauvegarde", e);
    }
}

// Initialisation de l'API globale
window.lepripriAPI = Object.assign(window.lepripriAPI || {}, {
    fireBase: {
        app,
        db,
        auth,
        storage,
        logout,
        saveKeyToCloud, // On l'expose ici
        login: {
            registerEmail: (e, p) => createUserWithEmailAndPassword(auth, e, p),
            loginEmail: (e, p) => signInWithEmailAndPassword(auth, e, p),
            loginGithub: () => signInWithRedirect(auth, new GithubAuthProvider()),
            loginGoogle: () => signInWithRedirect(auth, new GoogleAuthProvider()),
            loginFacebook: () => signInWithRedirect(auth, new FacebookAuthProvider())
        },
        isConnected: false
    }
});

// Écouteur de connexion
onAuthStateChanged(auth, user => {
    if (user) {
        console.log("✅ Connecté :", user.uid);
        document.body.setAttribute("logged", "");
        window.lepripriAPI.fireBase.isConnected = true;
    } else {
        console.log("❌ Déconnecté");
        document.body.removeAttribute("logged");
        window.lepripriAPI.fireBase.isConnected = false;
    }
});

console.log("🔥 Firebase ready");
