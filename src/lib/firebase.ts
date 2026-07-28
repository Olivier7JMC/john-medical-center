import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  initializeFirestore, 
  getFirestore, 
  persistentLocalCache, 
  persistentMultipleTabManager,
  setLogLevel,
  Firestore 
} from 'firebase/firestore';
import firebaseConfigJson from '../../firebase-applet-config.json';

const firebaseConfig = {
  apiKey: firebaseConfigJson.apiKey,
  authDomain: firebaseConfigJson.authDomain,
  projectId: firebaseConfigJson.projectId,
  storageBucket: firebaseConfigJson.storageBucket,
  messagingSenderId: firebaseConfigJson.messagingSenderId,
  appId: firebaseConfigJson.appId,
};

const databaseId = firebaseConfigJson.firestoreDatabaseId || '(default)';

let dbInstance: Firestore | null = null;

// Adjust Firestore log level to error to avoid cluttering logs on transient connection retries
try {
  setLogLevel('error');
} catch {
  // ignore
}

export function getDb(): Firestore {
  if (!dbInstance) {
    const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    try {
      dbInstance = initializeFirestore(app, {
        experimentalAutoDetectLongPolling: true,
        localCache: persistentLocalCache({ tabManager: persistentMultipleTabManager() })
      }, databaseId);
    } catch {
      dbInstance = getFirestore(app, databaseId);
    }
  }
  return dbInstance;
}

