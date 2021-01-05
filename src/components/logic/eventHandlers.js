import firebase from "firebase/app";
import { auth, firestore } from "../../firebase";
import getActiveCategory from "./getActiveCategory";

const eventHandlers = (
  categories, setCategories, categoryInput, setCategoryInput, setCategorySelected, 
  taskInput, setTaskInput,
  ) => {

  const categoryIndex = getActiveCategory(categories, "getIndex");  

  const addNewCategory = (e) => {
    e.preventDefault();

    // Prevent user from submitting empty strings
    if (categoryInput.length < 1) return;

    // Inactive the currently active category
    firestore.collection("categories").doc(categories[categoryIndex].id).update({ active: false });

    // Add the new document/category to the db, set active to true
    firestore.collection("categories").add({
      active: true,
      name: categoryInput,
      tasks: [],
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      userID: auth.currentUser.uid,
    }).then(() => console.log("Document successfully written!"))
    .catch(error => console.error("Error writing document: ", error));

    setCategorySelected(true);

    // Clear input field
    setCategoryInput("");
  };


  const changeCategory = (e) => {
    setCategorySelected(true);

    // Disable currently active category
    categories.forEach(category => {
      if (category.active) {
        const document = firestore.collection("categories").doc(category.id);
        document.update({ active: false });
      }
    });

    // Activate new category
    const docID = e.target.dataset.id;
    const targetDocument = firestore.collection("categories").doc(docID);
    return targetDocument.update({ active: true });
  };


  const deleteCategory = (e) => {
    // Delete category from Firestore database
    firestore.collection("categories").doc(categories[categoryIndex].id).delete()
    .then(() => console.log(`Document successfully deleted!`))
    .catch(error => console.error(`Error removing document ${error}`));

    // Activate another category only if there is at least 1 remaining category after the delete
    if (categories.length > 1) {
      // If the first category in the list was deleted, activate the second category in the list
      if (categoryIndex === 0) {
        const targetDocument = firestore.collection("categories").doc(categories[1].id);
        return targetDocument.update({ active: true })
        .then(() => console.log(`Category with the ${categories[1].id} is now active!`))
        .catch((error) => console.error("Error updating document: ", error));
      } else {
        // Otherwise set the first category to be active
        const targetDocument = firestore.collection("categories").doc(categories[0].id);
        return targetDocument.update({ active: true })
        .then(() => console.log(`Category with ID of ${categories[0].id} is now active!`))
        .catch((error) => console.error("Error updating document: ", error));
      }
    } else if (categories.length <= 1) {
      setCategorySelected(false);
    }
  };

  
  const addTask = (e) => {
    e.preventDefault();
    const index = getActiveCategory(categories, "getIndex");
    const id = getActiveCategory(categories, "getID");

    // Add a task to the new array
    const newCategories = [...categories];
    newCategories[index].tasks.push({
      taskName: taskInput,
      complete: false,
      id: Date.now(),
    });

    setCategories(newCategories);

    // Update the taskList
    firestore.collection("categories").doc(id).update({ 
      tasks: newCategories[index].tasks 
    })
    .then(() => console.log(`Added new task: ${taskInput}!`))
    .catch(error => console.error(`Error adding task: ${taskInput}`));
    setTaskInput("");
  };


  const handleTaskInput = (e) => setTaskInput(e.target.value);


  const completeTask = (e) => {
    const taskIndex = Number(e.target.dataset.index);
    const newCategories = [...categories];
    // Toggle true/false for task completion
    newCategories[categoryIndex].tasks[taskIndex].complete = !newCategories[categoryIndex].tasks[taskIndex].complete;
    firestore.collection("categories").doc(categories[categoryIndex].id).update({ 
      tasks: newCategories[categoryIndex].tasks 
    });
  };

  
  const deleteTask = (e) => {
    const taskIndex = Number(e.target.dataset.index);
    const newCategories = [...categories];
    newCategories[categoryIndex].tasks.splice(taskIndex, 1);
    firestore.collection("categories").doc(categories[categoryIndex].id).update({ 
      tasks: newCategories[categoryIndex].tasks 
    });
  };

  const clearCompleted = (e) => {
    const newTaskArray = categories[categoryIndex].tasks.filter(task => !task.complete);
    firestore.collection("categories").doc(categories[categoryIndex].id).update({ 
      tasks: newTaskArray,
    });
  }

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider).then((result) => {
      // If user is not already in the firestore db, add new user to "users" collection
      firestore.collection("users").get().then(snapshot => {
        let isUserInDatabase;
        snapshot.docs.forEach(doc => (doc.data().id === result.user.uid) ? isUserInDatabase = true : null);
        // The user is registering for the first time
        if (!isUserInDatabase) {
          // Add to users
          firestore.collection("users").add({
            email: auth.currentUser.email,
            id: auth.currentUser.uid,
          }).then(() => console.log(`User has been added to the 'users' database!`));
          
          // Add some stuff to the collection!
          // .............

        } else {
          console.log("User is already in the database!");
        }
      });
    }).catch(error => console.log(error));
  };

  return {
    addNewCategory,
    changeCategory,
    deleteCategory,
    addTask,
    handleTaskInput,
    completeTask,
    deleteTask,
    clearCompleted,
    signInWithGoogle,
  };
};

export default eventHandlers;