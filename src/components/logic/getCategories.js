import { firestore } from "../../firebase";

// Create real-time subscription to the database
function getCategories(setCategories) {
  firestore.collection("categories").onSnapshot(snapshot => {
    // Iterate through docs in collection, merge the doc's id with the pre-existing object data in the document, update the state
    const newCategories = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    setCategories(newCategories);
  });
}

export default getCategories;