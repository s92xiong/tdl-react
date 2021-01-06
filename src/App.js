import React, { useState, useEffect } from 'react';
import './App.css';
import eventHandlers from './components/logic/eventHandlers';
import Header from './components/header/Header.jsx';
import LandingPage from './components/landingPage/LandingPage.jsx';
import Sidebar from './components/sidebar/Sidebar.jsx';
import Content from './components/content/Content.jsx';
import getCategories from './components/logic/getCategories';
import { auth } from './firebase';
import { useAuthState } from "react-firebase-hooks/auth";
// import { useCollectionData } from "react-firebase-hooks/firestore";


import './App.css';

function App() {
  // useAuthState checks if user is logged in and returns an object, otherwise return null
  const [user] = useAuthState(auth);
  
  // Initialize array state which is a copy of the data from the Firestore collection "categories"
  const [categories, setCategories] = useState([]);

  // Input field to add a category
  const [categoryInput, setCategoryInput] = useState("");
  
  // Initialize variable state to be used for conditional rendering of content header in ContentHeader.jsx
  const [categorySelected, setCategorySelected] = useState(false);

  // Input field to add tasks
  const [taskInput, setTaskInput] = useState("");

  const { 
    // Retrieve methods from eventHandlers.js
    addCategory, changeCategory, deleteCategory, addTask, handleTaskInput, 
    completeTask, deleteTask, clearCompleted, signInWithGoogle
  } = eventHandlers(
    // Insert arguments here
    categories, categoryInput, setCategoryInput, setCategorySelected, taskInput, setTaskInput,
  );

  useEffect(() => {
    // Execute only if "user" is logged in, otherwise 'auth' in getCategories.js will cause a crash
    if (user) getCategories(setCategories);
   }, [user]);
  
  return (
    <div className="App">
      <Header />
      {
        (!user) ?
        // Display the following code if the user is NOT signed in
        <LandingPage signInWithGoogle={signInWithGoogle} />
        :
        // Display the following code if the user IS signed in
        <div className="container">
          <Sidebar 
            handleSubmit={addCategory} 
            setCategoryInput={setCategoryInput}
            categoryInput={categoryInput}
            categories={categories}
            changeCategory={changeCategory}
          />
          <Content
            // Content Header
            categories={categories}
            categorySelected={categorySelected}
            handleDeleteCategory={deleteCategory}

            // Task Content
            submitTask={addTask}
            taskInputState={taskInput}
            handleTaskInput={handleTaskInput}
            completeTask={completeTask}
            deleteTask={deleteTask}
            clearCompleted={clearCompleted}
          />
        </div>
      }
    </div>
  );
}

export default App;