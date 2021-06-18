/* eslint-disable indent */
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/firestore';

const app = !firebase.apps.length
  ? firebase.initializeApp({
      apiKey: 'AIzaSyD-MqhAw9eqdXV9HuYg82ptLxzcdI2kSZ8',
      authDomain: 'instakilogram-dd5b3.firebaseapp.com',
      projectId: 'instakilogram-dd5b3',
      storageBucket: 'instakilogram-dd5b3.appspot.com',
      messagingSenderId: '831483700069',
      appId: '1:831483700069:web:f9c4d97926bdf0579eb78c',
    })
  : firebase.app();

export const auth = app.auth();
export const storage = app.storage();
export const firestore = app.firestore();
export const timestamp = firebase.firestore.FieldValue.serverTimestamp;
export default app;
