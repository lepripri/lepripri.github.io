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

async function syncUserProfile(user) {
    if (!user) return;

    const userRef = doc(db, "users", user.uid);
    const userData = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || "Anonyme",
        photoURL: user.photoURL || "",
        lastLogin: new Date().toISOString()
    };

    try {
        // "merge: true" évite d'écraser la aiKey si elle existe déjà
        await setDoc(userRef, userData, { merge: true });
        console.log("sync ✔");
    } catch (e) {
        console.error("firestoreError :", e);
    }
}

const firebaseConfig = {
    apiKey: "AIzaSyDu0_TtOqAybnVLe7Ye1UcUUjbU8513BUA",
    authDomain: "le-milliminutes.firebaseapp.com",
    projectId: "le-milliminutes",
    storageBucket: "le-milliminutes.firebasestorage.app",
    messagingSenderId: "80244197022",
    appId: "1:80244197022:web:420e34b41cbcf68f02dd8f",
    measurementId: "G-BFCPKQKX2Y"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
async function updateUserData(data) {
    const user = auth.currentUser;
    if (!user) {
        console.warn("saveError : not logged");
        return;
    }

    try {
        // 'doc(db, "users", user.uid)' pointe vers ton document
        // 'data' est l'objet contenant les champs à ajouter/modifier
        await setDoc(doc(db, "users", user.uid), data, { merge: true });
        console.log("saved!");
    } catch (e) {
        console.error("Erreur lors de la sauvegarde :", e);
    }
}
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
        console.log("Clé sauvegardée sur ton compte milliminutes ! ☁️");
    } catch (e) {
        console.error("Erreur de sauvegarde", e);
    }
}

// Initialisation de l'API globale
window.milliminutesAPI = Object.assign(window.milliminutesAPI || {}, {
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
        isConnected: false,
        saveData: async (data) => {
            const user = auth.currentUser;
            if (user) {
                await setDoc(doc(db, "users", user.uid), data, { merge: true });
            }
        },
        updateUserData
    }
});

// Écouteur de connexion
onAuthStateChanged(auth, async user => {
    if (user) {
        console.log("✅ logged :", user.uid);
        document.body.setAttribute("logged", "");
        window.milliminutesAPI.fireBase.isConnected = true;
        await syncUserProfile(user);
    } else {
        console.log("❌ !logged");
        document.body.removeAttribute("logged");
        window.milliminutesAPI.fireBase.isConnected = false;
    }
});

console.log("🔥 Firebase ready");
