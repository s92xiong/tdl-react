import firebase from "../../firebase";

// Create real-time subscription to the database
function getCategories(setCategories) {
  const database = firebase.firestore();
  database.collection("categories").onSnapshot(snapshot => {
    // Iterate through documents in the collection, merge the document's id with the..
    // ..pre-existing object data in the document, then update the state
    const newCategories = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    setCategories(newCategories);
  });
}

export default getCategories;