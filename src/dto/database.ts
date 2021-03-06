import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';



const firebaseConfig = JSON.parse(process.env.FIREBASE_CONFIG || '');
console.log(firebaseConfig);

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);