import React, { useState, useEffect } from 'react';
import './App.css';
import eventHandlers from './components/logic/eventHandlers';
import Navbar from './components/Navbar/Navbar.jsx';
import LandingPage from './components/landingPage/LandingPage.jsx';
import Sidebar from './components/sidebar/Sidebar.jsx';
import Content from './components/content/Content.jsx';
import getCategories from './components/logic/getCategories';
import { auth } from './firebase';
import { useAuthState } from "react-firebase-hooks/auth";
// import { useCollectionData } from "react-firebase-hooks/firestore";


import './App.css';
import Modal from './components/Modal/Modal';

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

  // Initialize variable state to control sidebar open/close
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // State to edit task name
  const [taskModalOpen, setTaskModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);

  // State to edit list name
  const [listModalOpen, setListModalOpen] = useState(false);
  const [listToEdit, setListToEdit] = useState(null);

  // Retrieve methods from eventHandlers.js
  const { 
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
  } = eventHandlers(
    // Insert arguments here
    categories, categoryInput, setCategoryInput, setCategorySelected, taskInput, setTaskInput,
    sidebarOpen, setSidebarOpen, setTaskModalOpen, taskToEdit, setTaskToEdit, setListModalOpen, 
    setListToEdit, listToEdit
  );

  useEffect(() => {
    if (user) getCategories(setCategories, setCategorySelected);
  }, [user]);
  
  return (
    <div className="App">
      <Navbar
        openSidebar={openSidebar}
      />
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
            sidebarOpen={sidebarOpen}
          />
          <Content
            // Content Header
            categories={categories}
            categorySelected={categorySelected}
            handleDeleteCategory={deleteCategory}
            openListModal={openListModal}

            // Task Content
            submitTask={addTask}
            taskInputState={taskInput}
            handleTaskInput={handleTaskInput}
            completeTask={completeTask}
            deleteTask={deleteTask}
            clearCompleted={clearCompleted}
            openTaskModal={openTaskModal}
          />
        </div>
      }
      {
        (taskModalOpen) && 
        <Modal 
          type="Task" 
          modalClassName="task-modal" 
          setModalOpen={setTaskModalOpen}
          inputToEdit={taskToEdit}
          setInputToEdit={setTaskToEdit}
          handleSubmitEdit={editTask}
        />
      }
      {
        (listModalOpen) && 
        <Modal 
          type="List" 
          modalClassName="list-modal" 
          setModalOpen={setListModalOpen}
          inputToEdit={listToEdit}
          setInputToEdit={setListToEdit}
          handleSubmitEdit={editListName}
        />
      }
    </div>
  );
}

export default App;