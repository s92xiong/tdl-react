import firebase from "../../firebase";
import getActiveCategory from "./getActiveCategory";

const eventHandlers = (
  categories, setCategories, categoryInput, setCategoryInput, setCategorySelected, 
  taskInput, setTaskInput,
  ) => {

  // Initialize a constant variable for firebase
  const db = firebase.firestore();
  
  // ADD A CATEGORY IN THE SIDEBAR
  const addNewCategory = (e) => {
    e.preventDefault();

    // Prevent user from submitting empty strings
    if (categoryInput.length < 1) return;

    // Prevent duplicate naming for categories
    let duplicate = false;
    categories.forEach(category => (category.name === categoryInput) ? duplicate = true : null);
    if (duplicate) return;

    // Set all categories to "active: false", there should only be 1 active category/document
    if (categories.length > 1) {
      db.collection("categories").get()
      .then(snapshot => snapshot.docs.forEach(doc => doc.ref.update({ active: false })))
      .catch(error => console.error(`Error updating documents in categories: ${error}`));
    }

    // Add the new document/category to the db
    db.collection("categories").add({
      active: true,
      name: categoryInput,
      tasks: [],
    }).then(() => console.log("Document successfully written!"))
    .catch(error => console.error("Error writing document: ", error));

    setCategorySelected(true);

    // Clear input field
    setCategoryInput("");
  };

  // CHANGE CATEGORY WHEN A CATEGORY (IN THE SIDEBAR) IS CLICKED
  const changeCategory = (e) => {
    setCategorySelected(true);

    // Disable currently active category
    categories.forEach(category => {
      if (category.active) {
        const document = db.collection("categories").doc(category.id);
        document.update({ active: false });
      }
    });

    // Activate new category
    const docID = e.target.dataset.id;
    const targetDocument = db.collection("categories").doc(docID);
    return targetDocument.update({ active: true });
  };

  // DELETE A CATEGORY
  const deleteCategory = (e) => {
    // Get the id and index of the document/category you want to delete
    const id = getActiveCategory(categories, "getID");
    const index = getActiveCategory(categories, "getIndex");

    // Delete the document
    db.collection("categories").doc(id).delete()
    .then(() => console.log(`Document ${id} successfully deleted!`))
    .catch(error => console.error(`Error removing document ${id}: ${error}`));

    // Activate another category only if there is at least 1 remaining category after the delete
    if (categories.length > 1) {
      // If the first category in the list was deleted, activate the second category in the list
      if (index === 0) {
        const targetDocument = db.collection("categories").doc(categories[1].id);
        return targetDocument.update({ active: true })
        .then(() => console.log(`Category with the ${categories[1].id} is now active!`))
        .catch((error) => console.error("Error updating document: ", error));
      } else {
        // Otherwise set the first category to be active
        const targetDocument = db.collection("categories").doc(categories[0].id);
        return targetDocument.update({ active: true })
        .then(() => console.log(`Category with the ${categories[0].id} is now active!`))
        .catch((error) => console.error("Error updating document: ", error));
      }
    }

    setCategorySelected(false);
  };

  // ADD A TASK
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
    db.collection("categories").doc(id).update({ 
      tasks: newCategories[index].tasks 
    })
    .then(() => console.log(`Added new task: ${taskInput}!`))
    .catch(error => console.error(`Error adding task: ${taskInput}`));
    setTaskInput("");
  };

  const handleTaskInput = (e) => setTaskInput(e.target.value);

  const checkCircle = (e) => {
    const categoryIndex = getActiveCategory(categories, "getIndex");
    const taskIndex = Number(e.target.dataset.index);

    // Create new state and use this to update the database
    const newCategories = [...categories];
    newCategories[categoryIndex].tasks[taskIndex].complete = !newCategories[categoryIndex].tasks[taskIndex].complete;

    db.collection("categories").doc(categories[categoryIndex].id).update({ 
      tasks: newCategories[categoryIndex].tasks 
    });
    
    setTaskInput("");
  };

  return {
    addNewCategory,
    changeCategory,
    deleteCategory,
    addTask,
    handleTaskInput,
    checkCircle,
  };
};

export default eventHandlers;