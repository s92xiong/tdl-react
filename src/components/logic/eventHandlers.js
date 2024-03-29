import firebase from "firebase/app";
import { auth, firestore } from "../../firebase";
import getActiveCategory from "./getActiveCategory";

const eventHandlers = (
    categories, categoryInput, setCategoryInput, setCategorySelected, taskInput, setTaskInput,
    sidebarOpen, setSidebarOpen, setTaskModalOpen, taskToEdit, setTaskToEdit, setListModalOpen, setListToEdit, listToEdit
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

  
  const deleteTask = (taskId) => {
    const handler = async (e) => {
      // Remove the desired element/task from the newly copied categories array
      const newTaskArray = categories[actIndex].tasks.filter(task => (task.id !== taskId));

      // Update Firestore database using the newly updated array
      await firestore.collection("categories").doc(actID).update({ 
        tasks: newTaskArray 
      });
    };
    return handler;
  };

  const clearCompleted = async (e) => {
    // Filter through categories, return tasks that are not complete
    const newTaskArray = categories[actIndex].tasks.filter(task => !task.complete);
    await firestore.collection("categories").doc(actID).update({ tasks: newTaskArray });
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
              name: "Reading list",
              tasks: [
                { taskName: "Man's Search For Meaning - Viktor Frankl", complete: true, id: Date.now() },
                { taskName: "An Astronaut's Guide to Life on Earth - Chris Hadfield", complete: true, id: Date.now() + 1 },
                { taskName: "How to Win Friends and Influence People - Dale Carnegie", complete: true, id: Date.now() + 2 },
                { taskName: "Atomic Habits - James Clear", complete: false, id: Date.now() + 3 },
                { taskName: "Deep Work - Cal Newport", complete: false, id: Date.now() + 4 },
              ],
              userID: auth.currentUser.uid,
            });
          });
        }
      });
    }).catch(error => console.log(error));
  };

  const openSidebar = () => setSidebarOpen(!sidebarOpen);

  // Execute code when user clicks on the edit button
  const openTaskModal = (task) => {
    const handler = () => {
      setTaskModalOpen(true);
      setTaskToEdit({
        name: task.taskName,
        id: task.id
      });
    };
    return handler;
  };

  const editTask = async (e) => {
    e.preventDefault();

    const newCategories = [...categories];
    newCategories[actIndex].tasks.forEach(task => {
      // Update the task name in categories state using the taskToEdit variable state
      if (task.id === taskToEdit.id) {
        task.taskName = taskToEdit.name
      }
    });
    
    await firestore.collection("categories").doc(actID).update({ tasks: newCategories[actIndex].tasks });

    setTaskModalOpen(false);
    setTaskToEdit({
      ...taskToEdit,
      name: "",
    });
  };

  // When user clicks on edit button for list
  const openListModal = (activeCategory) => {
    const handler = () => {
      setListModalOpen(true);
      setListToEdit({
        name: activeCategory
      });
    };
    return handler;
  };

  // Execute code when user presses enter button key on inputfield selected
  const editListName = async (e) => {
    e.preventDefault();
    
    await firestore.collection("categories").doc(actID).update({ name: listToEdit.name });

    setListModalOpen(false);
    setListToEdit({
      ...taskToEdit,
      name: "",
    });
  };

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
    openTaskModal,
    editTask,
    openListModal,
    editListName
  };
};

export default eventHandlers;