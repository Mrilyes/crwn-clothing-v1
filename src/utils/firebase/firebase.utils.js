import { initializeApp } from 'firebase/app'

import { getAuth , 
         //signInWithRedirect ,
         signInWithPopup ,
         GoogleAuthProvider,
         createUserWithEmailAndPassword,
         signInWithEmailAndPassword,
         signOut,
         onAuthStateChanged
        } from 'firebase/auth'

import {
      getFirestore,
      doc,
      getDoc,
      setDoc,
      collection,
      writeBatch,
      query,
      getDocs
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

export const addCollectionAndDocuments = async (collectionKey,objectsToAdd , fleld) => {
  
    const collectionRef = collection(db,collectionKey);
    const batch = writeBatch(db);
    
    objectsToAdd.forEach((object) => {
      const docRef = doc(collectionRef , object.title.toLowerCase());
      batch.set(docRef , object);
    });

    await batch.commit();
    console.log('done');
};

export const getCategoriesAndDocuments = async() => {
  const collectionRef = collection(db , 'categories');
  const q = query(collectionRef);
  const querySnapshot = await getDocs(q);
  const categoryMap = querySnapshot.docs.reduce((acc , docSnapshot) => {
    const {title , items} = docSnapshot.data();
    acc[title.toLowerCase()] = items;
    return acc;
  } , {});
  return categoryMap;

}

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

export const signOutUser = async() =>  await signOut(auth);

export const onAuthStateChangedListener = (callback) => 
{
  onAuthStateChanged(auth , callback); 
}