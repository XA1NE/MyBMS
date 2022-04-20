/**
 * Configuration file for Firebase
 */

import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'

const app = firebase.initializeApp({
    apiKey: process.env.REACT_APP_MYBMS_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_MYBMS_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_MYBMS_FIREBASE_DATABASE_URL,
    projectId: process.env.REACT_APP_MYBMS_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_MYBMS_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MYBMS_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_MYBMS_FIREBASE_APP_ID
})

export const auth = app.auth()
export default app