import { auth, firestore } from "../../firebase";

// Create real-time subscription to the database
function getCategories(setCategories, setCategorySelected) {
  // Copy the user's categories into an array
  firestore.collection("categories").orderBy("createdAt").onSnapshot(snapshot => {
    // Merge the document id with the pre-existing object data in the document
    // Filter through list, return documents that belong to the current user logged in
    const newCategories = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })).filter(category => category.userID === auth.currentUser.uid);

    setCategorySelected(true);
    setCategories(newCategories);
  });
}

export default getCategories;