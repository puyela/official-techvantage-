// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword} from "firebase/auth";
import {getStorage} from "firebase/storage";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBHfqHjpX85eDnJiOZ9P7Au6FRrev2vuY8",
  authDomain: "blog-techvantage-5298d.firebaseapp.com",
  projectId: "blog-techvantage-5298d",
  storageBucket: "blog-techvantage-5298d.appspot.com",
  messagingSenderId: "284972189890",
  appId: "1:284972189890:web:a510cb5ca62e11670e535b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Initialize Firebase Authentication
const db = getFirestore(app); // Initialize Firestore
const storage = getStorage(app); // Initialize Firebase Storage

// Register user function
// const registerUser = async (name, email, password) => {
//   try {
//     const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//     const user = userCredential.user;

//     // Save user data to Firestore
//     const userRef = doc(db, "users", user.uid);
//     await setDoc(userRef, {
//       name: name,
//       email: email,
//       profileImage: null, // You can add functionality to upload and store profile image later
//       bio: "",
//       createdAt: new Date(),
//       updatedAt: new Date(),
//       socialLinks: {
//         twitter: "",
//         linkedin: ""
//       }
//     });

//     console.log("User registered and saved to Firestore:", user.uid);
//     return user;
//   } catch (error) {
//     console.error("Error registering user:", error.message);
//     throw error;
//   }
// };

export {auth, db, storage};