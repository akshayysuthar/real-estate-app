import { initializeApp , firebase } from 'firebase/app';
import { getStorage} from 'firebase/storage';
import { ref } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyCbBSrUNJAzzTgaBaWm9-jvMxI_FfB0OjM",
  authDomain: "server-26112.firebaseapp.com",
  projectId: "server-26112",
  storageBucket: "server-26112.appspot.com",
  messagingSenderId: "890692446763",
  appId: "1:890692446763:web:8c9d72c6dbbe70d295d86e",
  measurementId: "G-5BQ1848XF7",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage, app as default };
