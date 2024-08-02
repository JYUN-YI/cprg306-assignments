import { db } from "../_utils/firebase";
import { collection, getDocs, addDoc, query } from "firebase/firestore";

export const getItems = async (userId) => {
    try {
      const itemsRef = collection(db, "users", userId, "items");
      const q = query(itemsRef);
      const querySnapshot = await getDocs(q);
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() });
      });
      return items;
    } catch (error) {
      console.error("Error getting items: ", error);
      throw error;
    }
  };

  export const addItem = async (userId, item) => {
    try {
      const itemsRef = collection(db, "users", userId, "items");
      const docRef = await addDoc(itemsRef, item);
      return docRef.id;
    } catch (error) {
      console.error("Error adding item: ", error);
      throw error;
    }
  };

  export const deleteItem = async (userId, itemId) => {
    try {
      const itemRef = doc(db, "users", userId, "items", itemId);
      await deleteDoc(itemRef);
    } catch (error) {
      console.error("Error deleting item: ", error);
      throw error;
    }
  };
  