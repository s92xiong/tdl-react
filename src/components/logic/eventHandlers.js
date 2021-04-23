import firebase from "firebase/app";
import { auth, firestore } from "../../firebase";
import getActiveCategory from "./getActiveCategory";

const eventHandlers = (
    categories, categoryInput, setCategoryInput, setCategorySelected, taskInput, setTaskInput,
    sidebarOpen, setSidebarOpen
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
      setSidebarOpen(false);
    }).catch(error => console.error(`Error adding category: ${error}`));
  };


  // When user clicks on a category in the sidebar, open that category
  const changeCategory = (e) => {
    // Inactive the currently active category
    firestore.collection("categories").doc(actID).update({ active: false })
    .then(() => {
      setCategorySelected(true);
      setSidebarOpen(false);
      // Activate new category
      const id = e.target.dataset.id;
      return firestore.collection("categories").doc(id).update({ active: true });
    }).catch((error) => `Error changing categories: ${error}`);
  };


  const deleteCategory = (e) => {
    const result = window.confirm("Are you sure you want to delete this list?");
    if (!result) return;

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
  };

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
  };

  const openSidebar = () => setSidebarOpen(!sidebarOpen);

  return {
    addCategory,
    changeCategory,
    deleteCategory,
    addTask,
    handleTaskInput,
    completeTask,
    deleteTask,
    clearCompleted,
    signInWithGoogle,
    openSidebar,
  };
};

export default eventHandlers;