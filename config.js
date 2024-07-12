// firebase config key setup

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


// Your web apps fire base configuration
const firebaseConfig ={
    apiKey: "AIzaSyCXGZ76S3tDXdKB38LiDqApZnF0zSZVwuw",
    authDomain: "internconnect-c39a4.firebaseapp.com",
    projectId: "internconnect-c39a4",
    storageBucket: "internconnect-c39a4.appspot.com",
    messagingSenderId: "854765235240",
    appId: "1:854765235240:web:bda8ce3a7bd908507ad91d",
    measurementId: "G-TSP9JY3KQS"
}

if (!firebase.apps.legth){
    firebase.initializeApp(firebaseConfig);
}

export { firebase } ;