import firebase from "firebase/app";
import "firebase/firestore";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDeEv86oCMmC_NZJAfw9ghxEVlo8dwMXt0",
  authDomain: "to-do-list-6d4f7.firebaseapp.com",
  projectId: "to-do-list-6d4f7",
  storageBucket: "to-do-list-6d4f7.appspot.com",
  messagingSenderId: "33362132326",
  appId: "1:33362132326:web:111fb962183d46f4dfdca7"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;