import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBuN7HVA7T1cnpqcGonn2H923RLJsNRl0M',
  authDomain: 'crwn-db-36fd9.firebaseapp.com',
  databaseURL: 'https://crwn-db-36fd9.firebaseio.com',
  projectId: 'crwn-db-36fd9',
  storageBucket: 'crwn-db-36fd9.appspot.com',
  messagingSenderId: '663557547',
  appId: '1:663557547:web:b8f66f1cd8e903d59b2eee',
  measurementId: 'G-4DVNY552P0'
};

firebase.initializeApp(firebaseConfig);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
