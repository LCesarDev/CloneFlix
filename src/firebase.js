
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyBWWfcj2Q6xF3SKk-oZw-St_FX0IqhQP64",
  authDomain: "cloneflix-3f78d.firebaseapp.com",
  projectId: "cloneflix-3f78d",
  storageBucket: "cloneflix-3f78d.firebasestorage.app",
  messagingSenderId: "227425978084",
  appId: "1:227425978084:web:7c2cfa6366abb793f9cef1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password)=>{
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "user"),{
             uid: user.uid,
             name,
             authProvider: "local",
             email,
        });
    } catch (error) {
            console.log(error);
            toast.error(error.code.split('/')[1].split('-').join(" "));
    }


}

const login = async(email, password)=>{
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }

}

const logout = ()=>{
    signOut(auth);
}

export {auth, db, login, signup, logout}