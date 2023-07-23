import { initializeApp } from 'firebase/app'

import { getAuth , 
         //signInWithRedirect ,
         signInWithPopup ,
         GoogleAuthProvider,
         createUserWithEmailAndPassword,
         signInWithEmailAndPassword
        } from 'firebase/auth'

import {
      getFirestore,
      doc,
      getDoc,
      setDoc
      } from 'firebase/firestore'


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDxKfuBM95syI3E-Ft8JOuoGcvuZiSNXlk",
    authDomain: "crwn-clothing-b8ed2.firebaseapp.com",
    projectId: "crwn-clothing-b8ed2",
    storageBucket: "crwn-clothing-b8ed2.appspot.com",
    messagingSenderId: "922573118884",
    appId: "1:922573118884:web:2ed21d22c37eba2a45f531"
  };
  
  // Initialize Firebase
  
  const app = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider();

  provider.setCustomParameters({
    prompt:"select_account"
  });

export const auth = getAuth();

export const signInWithGooglePopup = () => signInWithPopup(auth , provider);

// export const signInWithGoogleRedirect = () => signInWithGoogleRedirect(auth , provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async(userAuth , 
  additionalInformation = {}) => {

  if(!userAuth) return ;

  const userDocRef = doc(db , 'users' , userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()){
    const {displayName , email} = userAuth;
    const createdAt = new Date();
    
    try {
      await setDoc(userDocRef , {
        displayName,
        email,
        createdAt,
        ...additionalInformation
      });

    } catch(error){
      console.log(error.message);
    }
  }
  return userDocRef;
}

export const createAuthUserWithEmailAndPassword = async(email , password) => {

  if (!email || !password) return ;

  return await createUserWithEmailAndPassword(auth , email , password)

};

export const SignInAuthUserWithEmailAndPassword = async(email , password) => {

  if (!email || !password) return ;

  return await signInWithEmailAndPassword(auth , email , password)

};