import { initializeApp, getApps, getApp } from 'firebase/app';

const firebaseConfig = {
  "projectId": "studio-8444880559-d4b85",
  "appId": "1:1008301742758:web:de1c3481131db46acaf267",
  "storageBucket": "studio-8444880559-d4b85.firebasestorage.app",
  "apiKey": "AIzaSyAJAT3qHtErxKYZWwkDakaOTWpy--j8YuY",
  "authDomain": "studio-8444880559-d4b85.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "1008301742758"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export { app };
