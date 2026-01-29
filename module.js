  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyDu0_TtOqAybnVLe7Ye1UcUUjbU8513BUA",
    authDomain: "le-pripri.firebaseapp.com",
    projectId: "le-pripri",
    storageBucket: "le-pripri.firebasestorage.app",
    messagingSenderId: "80244197022",
    appId: "1:80244197022:web:420e34b41cbcf68f02dd8f",
    measurementId: "G-BFCPKQKX2Y"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
