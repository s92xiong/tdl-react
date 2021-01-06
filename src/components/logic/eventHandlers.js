<<<<<<< HEAD
const eventHandlers = (
    categories, dispatch, 
    categoryValue, setCategoryValue, 
    setCategorySelected, 
    currentCategory, setCurrentCategory,
    taskValue, setTaskValue,
  ) => {
  
  const addCategory = (e) => {
    e.preventDefault(); 
    
    // Prevent user from submitting empty strings
    if (categoryValue.length < 1) return;

    // Prevent duplicate categories
    const checkDuplicates = categories.filter(category => categoryValue === category.name);
    if (checkDuplicates.length > 0) return;
    
    dispatch({ type: "add-category", payload: { name: categoryValue } });

    setCurrentCategory(categoryValue);
    setCategoryValue("");
    setCategorySelected(true);
  };

  const changeCategory = (e) => {
    let categoryID;
    categories.forEach(category => {
      if (category.name === currentCategory) categoryID = category.id;
    });

    setCategorySelected(true);
    setCurrentCategory(e.target.getAttribute("name"));
    dispatch({ type: "change-category", payload: { id: categoryID } });
  };

  const deleteCategory = (e) => {
    // Get ID and index for the current category
    let categoryID, categoryIndex;
    categories.forEach((category, index) => {
      if (category.name === currentCategory) {
        categoryID = category.id;
        categoryIndex = index;
      }
    });

    // Update state for categories
    dispatch({ type: "delete-category", payload: { id: categoryID } });

    // If you delete a category, set the current category to the next category after it (index 1)
    if (categories.length > 1 && categoryIndex === 0) {
      setCurrentCategory(categories[1].name);
      // If you delete any category that isn't the first one, set the current category to 1st (index 0) in the list
    } else if (categories.length > 1) {
      setCurrentCategory(categories[0].name);
    } else {
      // If all categories are deleted (or non-existent), don't render any categories in the content header
      setCurrentCategory("");
      setCategorySelected(false);
    }
  };

  const submitTask = (e) => {
    e.preventDefault();
    dispatch({ type: "add-task", payload: { task: taskValue } });
    setTaskValue("");
=======
import firebase from "firebase/app";
import { auth, firestore } from "../../firebase";
import getActiveCategory from "./getActiveCategory";

const eventHandlers = (
    categories, categoryInput, setCategoryInput, setCategorySelected, taskInput, setTaskInput
  ) => {

  // Access index & id of [categories] containing the property "active":"true"
  const actIndex = getActiveCategory(categories, "getIndex");
  const actID = getActiveCategory(categories, "getID");

  const addCategory = (e) => {
    e.preventDefault();

    // Prevent user from submitting empty strings
    if (categoryInput.length < 1) return;

    // Inactive the currently active category only if there is at least 1 existing category
    if (categories.length > 0) firestore.collection("categories").doc(actID).update({ active: false });

    // Add the new document/category to the db, set active to true
    firestore.collection("categories").add({
      active: true, // Determines if category/list is rendered to the DOM
      name: categoryInput,
      tasks: [],
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      userID: auth.currentUser.uid,
    })
    .then(() => {
      setCategorySelected(true);
      setCategoryInput("");
    }).catch(error => console.error(`Error adding category: ${error}`));
  };


  // When user clicks on a category in the sidebar, open that category
  const changeCategory = (e) => {
    // Inactive the currently active category
    firestore.collection("categories").doc(actID).update({ active: false })
    .then(() => {
      setCategorySelected(true);
      // Activate new category
      const id = e.target.dataset.id;
      return firestore.collection("categories").doc(id).update({ active: true });
    }).catch((error) => `Error changing categories: ${error}`);
  };


  const deleteCategory = (e) => {
    // Delete category from Firestore database
    firestore.collection("categories").doc(actID).delete()
    .then(() => {
      // Activate another category only if there is at least 1 remaining category after the delete
      if (categories.length > 1) {
        // If the first category in the list was deleted, activate the second category in the list
        if (actIndex === 0) {
          firestore.collection("categories").doc(categories[1].id).update({ active: true });
        } else {
          // Otherwise set the first category to be active
          firestore.collection("categories").doc(categories[0].id).update({ active: true });
        }
      } else if (categories.length <= 1) {
        // Set to false if you delete the last existing category
        setCategorySelected(false);
      }
    }).catch(error => console.error(`Error removing document ${error}`));
  };

  const handleTaskInput = (e) => setTaskInput(e.target.value);
  
  const addTask = (e) => {
    e.preventDefault();

    // Add a task to the new array
    const newCategories = [...categories];
    newCategories[actIndex].tasks.push({
      taskName: taskInput,
      complete: false,
      id: Date.now(),
    });

    // Update the taskList in Firestore database
    firestore.collection("categories").doc(actID).update({ tasks: newCategories[actIndex].tasks })
    .then(() => setTaskInput(""))
    .catch(error => console.error(`Error adding task: ${taskInput}`));
  };


  const completeTask = (e) => {
    const taskIndex = Number(e.target.dataset.index);
    const newCategories = [...categories];
    // Toggle true/false for task completion
    newCategories[actIndex].tasks[taskIndex].complete = !newCategories[actIndex].tasks[taskIndex].complete;
    firestore.collection("categories").doc(actID).update({ 
      tasks: newCategories[actIndex].tasks 
    });
  };

  
  const deleteTask = (e) => {
    // Get data-index from the trash can element clicked on
    const taskIndex = Number(e.target.dataset.index);

    // Remove the desired element/task from the newly copied categories array
    const newCategories = [...categories];
    newCategories[actIndex].tasks.splice(taskIndex, 1);

    // Update Firestore database using the newly updated array
    firestore.collection("categories").doc(actID).update({ 
      tasks: newCategories[actIndex].tasks 
    });
  };

  const clearCompleted = (e) => {
    // Filter through categories, return tasks that are not complete
    const newTaskArray = categories[actIndex].tasks.filter(task => !task.complete);
    firestore.collection("categories").doc(actID).update({ tasks: newTaskArray });
  }

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider)
    .then((result) => {
      firestore.collection("users").get()
      .then(snapshot => {
        // Check if user is in database, if they are then set isUserInDatabase to true
        let isUserInDatabase;
        snapshot.docs.forEach(doc => (doc.data().id === result.user.uid) ? isUserInDatabase = true : null);
        
        // If user is not in database, add new user to "users" collection
        if (!isUserInDatabase) {
          // Add new user to "users" collection
          firestore.collection("users").add({
            email: auth.currentUser.email,
            id: auth.currentUser.uid,
          })
          .then(() => {
            // Add some categories and tasks for the user
            firestore.collection("categories").add({
              active: true,
              createdAt: firebase.firestore.FieldValue.serverTimestamp(),
              name: "How to use To Do",
              tasks: [
                { taskName: "On the left sidebar, add a new list by typing in a list and pressing the enter key", complete: false, id: Date.now() },
                { taskName: "Change lists by clicking on another list in the sidebar", complete: false, id: Date.now() },
                { taskName: "Add a new task above by typing something in and pressing enter", complete: false, id: Date.now() },
                { taskName: "To complete (or incomplete) a task, click on the respective checkmark", complete: true, id: Date.now() },
                { taskName: "You can delete a list or a task by clicking on their respective trash buttons", complete: false, id: Date.now() },
                { taskName: "Click the green 'Clear Completed' button to remove all completed tasks", complete: false, id: Date.now() },
                { taskName: "Sign out by clicking on your user icon in the top right, then click on the 'Sign Out' tab", complete: false, id: Date.now() },
              ],
              userID: auth.currentUser.uid,
            });
          });
        }
      });
    }).catch(error => console.log(error));
>>>>>>> 669f3b3
  };

  return {
    addCategory,
    changeCategory,
    deleteCategory,
<<<<<<< HEAD
    submitTask,
=======
    addTask,
    handleTaskInput,
    completeTask,
    deleteTask,
    clearCompleted,
    signInWithGoogle,
>>>>>>> 669f3b3
  };
};

export default eventHandlers;