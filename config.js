import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyA_9lz4DzfOkLWP3ufLyQMkUxzYLmSuLAs",
    authDomain: "medical-app-2a024.firebaseapp.com",
    projectId: "medical-app-2a024",
    storageBucket: "medical-app-2a024.appspot.com",
    messagingSenderId: "809229460718",
    appId: "1:809229460718:web:09740414bbb8c28bcaffff",
    measurementId: "G-CM7SDTZ9V1"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export {
    firebase
};