import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore"; // Add addDoc import


const firebaseConfig = {
  apiKey: "AIzaSyA8vJdUi9EDSJ2N3w8PX2Sj4WQ-ZP9FHXE",
  authDomain: "task1test-2db9a.firebaseapp.com",
  projectId: "task1test-2db9a",
  storageBucket: "task1test-2db9a.appspot.com",
  messagingSenderId: "788061557763",
  appId: "1:788061557763:web:b61d059c072ec2ed426a36",
  measurementId: "G-5QKV2VGN1G"
};


const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
export const database = {
  folders: collection(firestore, 'folders'),
  files: collection(firestore, 'files'),
}
export const auth = getAuth(app);

// Function to add data to folders collection
export const addFolder = async (folderData) => {
  try {
    const docRef = await addDoc(database.folders, folderData);
    console.log("Folder added with ID: ", docRef.id);
  } catch (error) {
    console.error("Error adding folder: ", error);
  }
};

// Function to add data to files collection
export const addFile = async (fileData) => {
  try {
    const docRef = await addDoc(database.files, fileData);
    console.log("File added with ID: ", docRef.id);
  } catch (error) {
    console.error("Error adding file: ", error);
  }
};

export default app;
