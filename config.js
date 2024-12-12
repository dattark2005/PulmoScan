import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBX3v707q9UCXARla6-hFm1tYZAvd6KqKw",
    authDomain: "pulmoscan-f3404.firebaseapp.com",
    databaseURL: "https://pulmoscan-f3404-default-rtdb.firebaseio.com",
    projectId: "pulmoscan-f3404",
    storageBucket: "pulmoscan-f3404.firebasestorage.app",
    messagingSenderId: "419252092339",
    appId: "1:419252092339:web:44b23e74eca05099429fc6",
    measurementId: "G-9EN7WRPKYV"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export {
    firebase
};